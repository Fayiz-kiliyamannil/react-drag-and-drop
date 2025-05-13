import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  INPUT_FIELD: 'inputField',
};

const DraggableInputField = ({ field }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.INPUT_FIELD,
    item: field,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 bg-gray-100 border rounded cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      {field.label} ({field.type})
    </div>
  );
};

export default DraggableInputField;