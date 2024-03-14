import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TaskItem from './TaskItem'
import { useTasks } from '../hooks/useTasks'
import { CgAdd, CgTrash } from 'react-icons/cg'
import { useColumns } from '../hooks/useColumns'
import { useState } from 'react'

function ColumnContainer ({ column, tasks }) {
  const { tasksId } = useTasks()
  const { delColumn, updateTitleColumn } = useColumns()

  const [editMode, setEditMode] = useState(false)

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
    },
    disabled: editMode
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

  const handleDelColumn = () => {
    delColumn(column)
  }

  const handleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleChangeTitle = (evt) => {
    updateTitleColumn({ column, newTitle: evt.target.value })
  }

  return (
    <div ref={setNodeRef} style={style} className='bg-slate-800 w-full min-w-[350px] max-w-[350px] h-[450px] flex flex-col justify-between rounded-md relative'>
      <div className='flex justify-between bg-stone-950 px-2 py-3 m-1 rounded-sm max-h-12' {...attributes} {...listeners} onClick={handleEditMode}>
        <div className='flex gap-2'>
          <span className='w-6 h-6 p-3 bg-slate-800 rounded-full flex justify-center items-center font-bold'>0</span>
          {!editMode && <h1 className='font-bold'>{column.title}</h1>}
          {editMode && (
            <input type='text' value={column.title} onBlur={handleEditMode} autoFocus className='bg-stone-950 text-white outline-none border focus:border-[#00beef] px-2 py-1 rounded font-bold' onChange={handleChangeTitle} />
          )}
        </div>
      </div>
      <button className='w-8 h-8 p-1 rounded-md hover:bg-slate-700 text-slate-400 hover:text-slate-300 absolute right-5 top-3'>
        <CgTrash onClick={handleDelColumn} className='w-full h-full' />
      </button>
      <div className='flex flex-col gap-3 py-3 flex-1 min-h-[300px] overflow-scroll overflow-x-hidden px-2 containerScroll'>
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
