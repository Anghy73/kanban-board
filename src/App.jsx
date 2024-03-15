import { TasksProvider } from '../context/tasks'
import Header from './components/Header'
import KanbanBoard from './components/KanbanBoard'

function App () {
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
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
