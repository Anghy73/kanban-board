import { useState } from 'react'

function Header () {
  const [title, setTitle] = useState('Kanban Board')
  const [editMode, setEditMode] = useState(false)

  const handleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleChangeTitle = (evt) => {
    setTitle(evt.target.value)
  }

  if (editMode) {
    return (
      <div className='flex justify-start items-center w-full min-h-16 px-10 border-b-2 border-[#00beef]'>
        <input className='bg-transparent border-none outline-none text-2xl font-bold' type='text' onBlur={handleEditMode} autoFocus onChange={handleChangeTitle} value={title} />
        {/* <span className='font-bold text-2xl cursor-pointer' onClick={handleEditMode}>Kanba Board</span> */}
      </div>
    )
  }

  return (
    <div className='flex justify-start items-center w-full min-h-16 px-10 border-b-2 border-[#00beef]'>
      <span className='font-bold text-2xl cursor-pointer' onClick={handleEditMode}>{title}</span>
    </div>
  )
}

export default Header
