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
      <div ref={setNodeRef} style={style} className='bg-orange-400 w-full min-h-10' />
    )
  }

  return (
    <>
      <div style={style} ref={setNodeRef} {...attributes} {...listeners} className='bg-blue-600 w-full min-h-10' key={task.id}>{task.content}</div>
    </>
  )
}

export default TaskItem
