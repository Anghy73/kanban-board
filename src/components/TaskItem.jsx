import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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
      <div style={style} ref={setNodeRef} {...attributes} {...listeners} className='bg-stone-950 w-full min-h-24 rounded-lg p-3' key={task.id}>{task.content}</div>
    </>
  )
}

export default TaskItem
