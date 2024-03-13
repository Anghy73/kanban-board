import { useReducer, createContext } from 'react'
import { reducerTasks, reducerTasksInitialState } from '../reducer/reducerTasks'

export const TasksContext = createContext()

export function TasksProvider ({ children }) {
  const [state, dispatch] = useReducer(reducerTasks, reducerTasksInitialState)

  // const addTask = product => dispatch({
  //   type: 'ADD_TASK',
  //   payload: product
  // })

  const updateOrdenTasks = product => dispatch({
    type: 'UPDATE_ORDEN_TASKS',
    payload: product
  })

  const tasksId = state.map(task => task.id)

  return (
    <TasksContext.Provider value={{
      tasks: state,
      tasksId,
      updateOrdenTasks
      // addTask
    }}
    >
      {children}
    </TasksContext.Provider>
  )
}
