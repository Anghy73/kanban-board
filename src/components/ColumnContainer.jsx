import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TaskItem from './TaskItem'
import { useTasks } from '../hooks/useTasks'
import { CgAdd } from 'react-icons/cg'

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
      <div ref={setNodeRef} style={style} className='bg-zinc-900 border-2 border-[#00beef] min-w-[350px] max-w-[350px] h-[450px] rounded-lg' />
    )
  }

  return (
    <div ref={setNodeRef} style={style} className='bg-slate-800 w-full min-w-[350px] max-w-[350px] h-[450px] flex flex-col justify-between rounded-md'>
      <div className='flex justify-between bg-stone-950 px-2 py-3 m-1 rounded-sm' {...attributes} {...listeners}>
        <div className='flex gap-2'>
          <span>0</span>
          <h1>{column.title}</h1>
        </div>
        <i>X</i>
      </div>
      <div id='TaskScroll' className='flex flex-col gap-3 py-3 flex-1 min-h-[300px] overflow-scroll overflow-x-hidden px-2'>
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
      </div>
      <button className='flex justify-center items-center gap-2 text-base py-3 rounded-md hover:bg-stone-950 m-1'>
        <CgAdd />
        Add Task
      </button>
    </div>
  )
}

export default ColumnContainer
