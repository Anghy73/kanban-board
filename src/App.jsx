import { TasksProvider } from '../context/tasks'
import KanbanBoard from './components/KanbanBoard'

function App () {
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
      <header>Header Component</header>
      <main className=' flex flex-1 w-full'>
        <TasksProvider>
          <KanbanBoard />
        </TasksProvider>
      </main>
    </div>
  )
}

export default App
