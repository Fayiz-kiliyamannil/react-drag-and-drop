import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import FormBuilder from "./components/FormBuilder";
import DraggableItem from "./components/DraggableItem";
import "./App.css";

const inputTypes = [
  { id: "text", label: "Text Input", type: "text" },
  { id: "radio", label: "Radio Button", type: "radio" },
  { id: "select", label: "Dropdown", type: "select" },
  { id: "checkbox", label: "Checkbox", type: "checkbox" },
  { id: "textarea", label: "Textarea", type: "textarea" },
];

function App() {
  const [items, setItems] = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Handle dropping into the droppable area
    if (over && over.id === "droppable") {
      const inputType = inputTypes.find((type) => type.id === active.id);
      if (inputType) {
        const newItem = {
          ...inputType,
          uniqueId: `${inputType.id}-${Date.now()}`,
        };
        setItems((prev) => [...prev, newItem]);
      }
    }
    // Handle sorting within the droppable area
    else if (over && active.id !== over.id && items.some((item) => item.uniqueId === active.id)) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((item) => item.uniqueId === active.id);
        const newIndex = prev.findIndex((item) => item.uniqueId === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex p-8 gap-8">
        {/* Left Column: Input Types */}
        <div className="w-1/3 bg-white p-4 border rounded">
          <h2 className="text-lg font-bold mb-4">Input Types</h2>
          {inputTypes.map((type) => (
            <DraggableItem key={type.id} id={type.id} label={type.label} />
          ))}
        </div>
        {/* Right Column: Form Builder */}
        <FormBuilder items={items} inputTypes={inputTypes} />
      </div>
    </DndContext>
  );
}

export default App;