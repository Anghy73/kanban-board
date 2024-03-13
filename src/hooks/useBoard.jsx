import { arrayMove } from '@dnd-kit/sortable'
import { useColumns } from './useColumns'
import { useTasks } from './useTasks'

export function useBoard ({ setActiveColumn, setActiveTask }) {
  const { columns, updateOrdenColumns } = useColumns()
  const { tasks, updateOrdenTasks } = useTasks()

  const handleDragStart = (evt) => {
    const { active } = evt

    if (active.data.current.type === 'Column') {
      setActiveColumn(active.data.current.column)
      return
    }

    if (active.data.current.type === 'Task') {
      setActiveTask(active.data.current.task)
    }
  }

  const handleDragOver = (evt) => {
    const { active, over } = evt

    if (!over) return
    if (active.id === over.id) return

    const isActiveTask = active.data.current.type === 'Task'
    const isOverTask = over.data.current.type === 'Task'

    if (!isActiveTask) return

    if (isActiveTask && isOverTask) {
      const oldIndex = tasks.findIndex(task => task.id === active.data.current.task.id)
      const newIndex = tasks.findIndex(task => task.id === over.data.current.task.id)
      if (tasks[oldIndex].columnId !== tasks[newIndex].columnId) {
        tasks[oldIndex].columnId = tasks[newIndex].columnId
        return updateOrdenTasks(arrayMove(tasks, oldIndex, newIndex - 1))
      }
      updateOrdenTasks(arrayMove(tasks, oldIndex, newIndex))
    }

    const isOverColumn = over.data.current.type === 'Column'

    if (isActiveTask && isOverColumn) {
      const oldIndex = tasks.findIndex(task => task.id === active.id)
      tasks[oldIndex].columnId = evt.over.id
      updateOrdenTasks(arrayMove(tasks, oldIndex, oldIndex))
    }
  }

  const handleDragEnd = (evt) => {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = evt

    if (!over) return
    if (active.id === over.id) return

    const isActiveColumn = active.data.current.type === 'Column'
    if (!isActiveColumn) return

    const oldIndex = columns.findIndex(col => col.id === active.id)
    const newIndex = columns.findIndex(col => col.id === over.id)

    updateOrdenColumns(arrayMove(columns, oldIndex, newIndex))
  }

  return { handleDragStart, handleDragOver, handleDragEnd }
}
