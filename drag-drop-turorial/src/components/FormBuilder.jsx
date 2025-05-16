import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SortableItem from "./SortableItem";

function FormBuilder({ items }) {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });

  return (
    <div
      ref={setNodeRef}
      className={`w-2/3 bg-white p-4 border rounded min-h-[400px] transition-colors duration-200 ${
        isOver ? "bg-blue-100" : "bg-white"
      }`}
    >
      <h2 className="text-lg font-bold mb-4">Form Builder</h2>
      <SortableContext
        items={items.map((item) => item.uniqueId)}
        strategy={verticalListSortingStrategy}
      >
        {items.length === 0 ? (
          <p className="text-gray-500">Drag and drop input fields here</p>
        ) : (
          items.map((item, index) => (
            <React.Fragment key={item.uniqueId}>
              <SortableItem id={item.uniqueId} item={item} />
            </React.Fragment>
          ))
        )}
      </SortableContext>
    </div>
  );
}

export default FormBuilder;