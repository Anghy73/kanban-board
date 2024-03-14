import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CgTrash } from 'react-icons/cg'

function TaskItem ({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className='border-2 border-[#00beef] w-full min-h-24 rounded-xl' />
    )
  }

  return (
    <>
      <div style={style} ref={setNodeRef} {...attributes} {...listeners} className='bg-stone-950 w-full min-h-24 rounded-lg p-3 relative hover:ring-2 hover:border-[#00beef] item'>
        <p>
          {task.content}
        </p>
        <CgTrash className='w-9 h-9 p-1 rounded-md hover:bg-slate-800 absolute right-5 top-8 text-slate-400 hover:text-slate-300 trash' />
      </div>
    </>
  )
}

export default TaskItem
