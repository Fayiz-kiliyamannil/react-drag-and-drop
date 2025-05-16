import React from "react";
import { useDraggable } from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';

function DraggableItem({ id, label }) {
  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({ id });

    const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`p-4 mb-2 bg-gray-100 border rounded  ${
        isDragging ? "opacity-50  scale-105 shadow-md" : "opacity-100"
      }`}
    >
      {label}
    </div>
  );
}

export default DraggableItem;