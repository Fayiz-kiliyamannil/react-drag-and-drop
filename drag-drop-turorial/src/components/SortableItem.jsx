import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id, item }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderInput = () => {
    switch (item.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder="Text input"
            className="w-full p-2 border rounded"
          />
        );
      case "radio":
        return (
          <label className="flex items-center">
            <input type="radio" name={id} className="mr-2" />
            Radio option
          </label>
        );
      case "select":
        return (
          <select className="w-full p-2 border rounded">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        );
      case "checkbox":
        return (
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Checkbox
          </label>
        );
      case "textarea":
        return (
          <textarea
            placeholder="Textarea"
            className="w-full p-2 border rounded"
            rows="3"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 mb-2 bg-gray-50 border rounded cursor-move"
    >
      {renderInput()}
    </div>
  );
}

export default SortableItem;