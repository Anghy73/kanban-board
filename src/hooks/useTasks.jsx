import { useContext } from 'react'
import { TasksContext } from '../../context/tasks'

export const useTasks = () => {
  const tasks = useContext(TasksContext)
  if (tasks === undefined) {
    throw new Error('useTasks must be used within a TasksProvider')
  }
  return tasks
}
