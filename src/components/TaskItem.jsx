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
        <div style={style} ref={setNodeRef} {...attributes} {...listeners} className='bg-stone-950 w-full min-h-24 rounded-lg p-3 relative hover:ring-2 hover:border-[#00beef] item'>
          <textarea className='w-full h-full bg-stone-950 border-none focus:outline-none resize-none' onBlur={handleEditMode} autoFocus value={task.content} onChange={handleChangeTextarea} />
        </div>
      </>
    )
  }

  return (
    <>
      <div style={style} ref={setNodeRef} {...attributes} {...listeners} className='bg-stone-950 w-full min-h-24 rounded-lg p-3 relative hover:ring-2 hover:border-[#00beef] item' onClick={handleEditMode}>
        {!editMode && <p className='w-full h-full'>{task.content}</p>}
        {editMode && (
          <textarea className='w-full h-full bg-stone-950 border-none focus:outline-none resize-none' onBlur={handleEditMode} autoFocus value={task.content} />
        )}
        {!activeText && <CgTrash className='w-9 h-9 p-1 rounded-md hover:bg-slate-800 absolute right-5 top-8 text-slate-400 hover:text-slate-300 trash' onClick={handleDelTask} />}
      </div>
    </>
  )
}

export default TaskItem
