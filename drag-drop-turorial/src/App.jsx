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
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event) => {
    console.log("Drag started:", event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("Drag ended:", { active: active.id, over: over?.id });

    // Handle dropping into the droppable area
    if (over) {
      const inputType = inputTypes.find((type) => type.id === active.id);
      if (inputType) {
        // Dropping a new item from the left column
        const newItem = {
          ...inputType,
          uniqueId: `${inputType.id}-${Date.now()}`,
        };
        if (over.id === "droppable") {
          // Drop at the end if over the droppable area (no specific item)
          setItems((prev) => [...prev, newItem]);
        } else {
          // Drop at the index of the over item
          const overIndex = items.findIndex((item) => item.uniqueId === over.id);
          if (overIndex !== -1) {
            setItems((prev) => {
              const newItems = [...prev];
              newItems.splice(overIndex, 0, newItem); // Insert at overIndex
              return newItems;
            });
          }
        }
      } else if (items.some((item) => item.uniqueId === active.id)) {
        // Sorting existing items in the right column
        const oldIndex = items.findIndex((item) => item.uniqueId === active.id);
        const newIndex = items.findIndex((item) => item.uniqueId === over.id);
        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
          setItems((prev) => arrayMove(prev, oldIndex, newIndex));
        }
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex p-8 gap-8">
        <div className="w-1/3 bg-white p-4 border rounded">
          <h2 className="text-lg font-bold mb-4">Input Types</h2>
          {inputTypes.map((type) => (
            <DraggableItem key={type.id} id={type.id} label={type.label} />
          ))}
        </div>
        <FormBuilder items={items} />
      </div>
    </DndContext>
  );
}

export default App;