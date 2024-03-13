import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TaskItem from './TaskItem'
import { useTasks } from '../hooks/useTasks'

function ColumnContainer ({ column, tasks }) {
  const { tasksId } = useTasks()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className='bg-emerald-500 w-52 h-56'>hola mundo</div>
    )
  }

  return (
    <div ref={setNodeRef} style={style} className='bg-red-400 w-52 h-56 flex flex-col'>
      <div {...attributes} {...listeners}>
        <h1>{column.title}</h1>
        <span>Column Container Component</span>
      </div>
      <div className='bg-emerald-400 flex flex-col gap-2 p-3 flex-1'>
        <SortableContext
          items={tasksId}
          strategy={verticalListSortingStrategy}
        >
          {
            tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))
          }
        </SortableContext>
        <div className='bg-red-600'>click</div>
      </div>
    </div>
  )
}

export default ColumnContainer
