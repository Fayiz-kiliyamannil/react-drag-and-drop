import React from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

const ItemTypes = {
  INPUT_FIELD: 'inputField',
};

const DroppableTable = ({ fields, setFields, setSelectedField }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.INPUT_FIELD,
    drop: (item) => {
      const newItem = { ...item, id: uuidv4() }; // Assign new ID to avoid duplicates
      setFields((prev) => [...prev, newItem]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  return (
    <div
      ref={drop}
      className={`border p-4 min-h-[200px] ${isOver ? 'bg-blue-100' : 'bg-white'}`}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Input Fields</th>
          </tr>
        </thead>
        <tbody>
          {fields.length === 0 ? (
            <tr>
              <td className="border p-2 text-center">Drop fields here</td>
            </tr>
          ) : (
            fields.map((field) => (
              <tr key={field.id}>
                <td
                  className="border p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleFieldClick(field)}
                >
                  {field.label} ({field.type})
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DroppableTable;