import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import DroppableTable from './components/DroppableTable';
import DraggableInputField from './components/DraggableInputField';
import InputFieldOptions from './components/InputFieldOptions';


const App = () => {
  const defaultInputFields = [
    { id: uuidv4(), type: 'text', label: 'Text Input' },
    { id: uuidv4(), type: 'select', label: 'Dropdown', options: [] },
    { id: uuidv4(), type: 'checkbox', label: 'Checkbox' },
  ];

  const [droppedFields, setDroppedFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Drag and Drop Input Fields</h1>
        <div className="flex gap-4">
          <div className="w-1/2">
            <h2 className="text-xl font-semibold mb-2">Form Builder</h2>
            <DroppableTable
              fields={droppedFields}
              setFields={setDroppedFields}
              setSelectedField={setSelectedField}
             />
          </div>
          <div className="w-1/2">
            <h2 className="text-xl font-semibold mb-2">Available Fields</h2>
            <div className="border p-4 mb-4">
              {defaultInputFields.map((field) => (
                <DraggableInputField key={field.id} field={field} />
              ))}
            </div>
            <h2 className="text-xl font-semibold mb-2">Field Options</h2>
            <InputFieldOptions
              selectedField={selectedField}
              setFields={setDroppedFields}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;