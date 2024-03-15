import { TasksProvider } from '../context/tasks'
import Header from './components/Header'
import KanbanBoard from './components/KanbanBoard'

function App () {
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen bg-gray-100 text-black dark:text-white dark:bg-[#0f0f0f]'>
      {/* <header>Header Component</header> */}
      <Header />
      <main className=' flex flex-1 w-full main'>
        <TasksProvider>
          <KanbanBoard />
        </TasksProvider>
      </main>
    </div>
  )
}

export default App
