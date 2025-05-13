import React, { useState } from 'react';



const InputFieldOptions = ({ selectedField, setFields }) => {

    
  const [option, setOption] = useState('');

  const addOption = () => {
    if (option && selectedField) {
      setFields((prev) =>
        prev.map((field) =>
          field.id === selectedField.id
            ? { ...field, options: [...(field.options || []), option] }
            : field
        )
      );
      setOption('');
    }
  };

  if (!selectedField) {
    return <div className="p-4">Select an input field to edit options</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">Options for {selectedField.label}</h3>
      {selectedField.type === 'select' ? (
        <div>
          <input
            type="text"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="border p-2 mr-2"
            placeholder="Add option"
          />
          <button
            onClick={addOption}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Option
          </button>
          <ul className="mt-2">
            {selectedField.options?.map((opt, index) => (
              <li key={index} className="p-1">{opt}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Options not applicable for {selectedField.type} input.</p>
      )}
    </div>
  );
};

export default InputFieldOptions;