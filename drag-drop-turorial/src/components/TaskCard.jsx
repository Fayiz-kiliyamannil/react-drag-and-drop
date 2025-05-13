import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react'

function TaskCard({ task }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: task.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 100ms ease',
        opacity: isDragging ? 0.4 : 1,
        position: 'relative',
        zIndex: isDragging ? 1 : 0,
        touchAction: 'none',
    };

    return (
        <div 
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            // style={style}   
            className={`item flex flex-col gap-2 rounded-lg bg-gray-300 p-2 cursor-move 
                hover:bg-gray-400 transition-all duration-300 ease-in-out
                hover:-translate-y-1 hover:shadow-lg
                active:translate-y-0 active:shadow-md
                ${isDragging ? 'shadow-lg' : ''}`}
        >
            <h3 className='text-xl font-bold'>{task.tittle}</h3>
            <p className='text-sm'>{task.description}</p>
        </div>
    )
}

export default TaskCard;