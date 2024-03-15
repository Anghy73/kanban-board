import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { CgTrash } from 'react-icons/cg'
import { useTasks } from '../hooks/useTasks'

function TaskItem ({ task }) {
  const { updateTextTask, delTask } = useTasks()

  const [editMode, setEditMode] = useState(false)
  const [activeText, setActiveText] = useState(false)

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
    },
    disabled: editMode
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const handleEditMode = () => {
    setEditMode(!editMode)
    setActiveText(!activeText)
  }

  const handleChangeTextarea = (evt) => {
    updateTextTask({ task, newText: evt.target.value })
  }
  const handleDelTask = () => {
    delTask(task)
  }

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className='border-2 border-[#00beef] w-full min-h-24 rounded-xl' />
    )
  }

  if (editMode) {
    return (
      <>
        <div style={style} ref={setNodeRef} {...attributes} {...listeners} className='bg-stone-200 dark:bg-stone-950 w-full min-h-24 rounded-lg p-3 relative hover:ring-2 hover:border-[#00beef] item'>
          <textarea className='w-full h-full bg-stone-200 dark:bg-stone-950 border-none focus:outline-none resize-none taskContent' onBlur={handleEditMode} autoFocus value={task.content} onChange={handleChangeTextarea} />
        </div>
      </>
    )
  }

  return (
    <>
      <div style={style} ref={setNodeRef} {...attributes} {...listeners} className='bg-stone-200 dark:bg-stone-950 w-full min-h-24 max-h-24 rounded-lg p-3 relative text-black dark:text-white border-2 border-transparent hover:border-[#00beef] item overflow-hidden' onClick={handleEditMode}>
        {!editMode && <p className='w-full h-full overflow-x-hidden overflow-y-auto taskContent'>{task.content}</p>}
        {!activeText && <CgTrash className='w-9 h-9 p-1 rounded-md bg-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700 absolute right-5 top-8 text-slate-600 dark:text-slate-300 hover:text-slate-300 trash' onClick={handleDelTask} />}
      </div>
    </>
  )
}

export default TaskItem
