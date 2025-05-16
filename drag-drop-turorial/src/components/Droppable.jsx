import React from "react";
import { useDroppable } from "@dnd-kit/core";

function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-full ${isOver ? "bg-blue-100" : ""}`}
    >
      {children}
    </div>
  );
}

export default Droppable;