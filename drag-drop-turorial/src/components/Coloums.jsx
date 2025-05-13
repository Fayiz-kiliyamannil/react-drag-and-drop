import React from 'react'
import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';


function Coloums({coloums, tasks}) {

  const { setNodeRef }  = useDroppable({
    id: coloums.id,
   
  });
    
  return (
   <>
   <div className='coloums flex w-80 flex-col rounded-lg bg-gray-200 p-4'>
    <h2 className='text-center text-2xl font-bold mb-3 text-purple-500 bold '>
      {coloums.tittle}</h2>
    <div ref={setNodeRef}  className='items flex flex-col gap-2 min-h-[200px]'>

  {
     tasks.map((obj)=>{
        return(
          <TaskCard key={obj.id} task={obj} />
        )   
     })
  }

    </div>
    </div>
   </>
  )
}

export default Coloums