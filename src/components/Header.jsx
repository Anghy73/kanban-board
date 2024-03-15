import { CgMoon, CgSun } from 'react-icons/cg'
import { useState, useEffect } from 'react'

function Header () {
  const [title, setTitle] = useState(window.localStorage.getItem('titleKanban') || 'Kanban Board')
  const [editMode, setEditMode] = useState(false)
  const root = document.documentElement

  useEffect(() => {
    window.localStorage.setItem('titleKanban', title)
  }, [title])

  useEffect(() => {
    if (window.localStorage.theme === 'dark' || (!window.localStorage.theme)) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }, [])

  const handleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleChangeTitle = (evt) => {
    setTitle(evt.target.value)
  }

  const handleModeDark = () => {
    root.classList.add('dark')
    root.classList.remove('light')
    window.localStorage.setItem('theme', 'dark')
  }

  const handleModeLight = () => {
    root.classList.add('light')
    root.classList.remove('dark')
    window.localStorage.setItem('theme', 'light')
  }

  if (editMode) {
    return (
      <div className='flex justify-between items-center w-full min-h-16 px-10 border-b-2 border-[#00beef]'>
        <input className='bg-transparent border-none outline-none text-2xl font-bold' type='text' onBlur={handleEditMode} autoFocus onChange={handleChangeTitle} value={title} />
        <button className='flex px-3 py-2 gap-3'>
          <CgMoon onClick={handleModeDark} className='w-5 h-5 hover:text-[#00beef]' />
          <CgSun onClick={handleModeLight} className='w-5 h-5 hover:text-[#00beef]' />
        </button>
      </div>
    )
  }

  return (
    <div className='flex justify-between items-center w-full min-h-16 px-10 border-b-2 border-[#00beef]'>
      <span className='font-bold text-2xl cursor-pointer max-w-2xl overflow-hidden text-nowrap' onClick={handleEditMode}>{title}</span>
      <button className='flex px-3 py-2 gap-3'>
        <CgMoon onClick={handleModeDark} className='w-5 h-5 hover:text-[#00beef]' />
        <CgSun onClick={handleModeLight} className='w-5 h-5 hover:text-[#00beef]' />
      </button>
    </div>
  )
}

export default Header
