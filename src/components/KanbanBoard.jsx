import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useColumns } from '../hooks/useColumns'
import ColumnContainer from './ColumnContainer'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import TaskItem from './TaskItem'
import { useTasks } from '../hooks/useTasks'
import { useBoard } from '../hooks/useBoard'

function KanbanBoard () {
  const { columns, columnsId } = useColumns()
  const { tasks } = useTasks()
  const [activeColumn, setActiveColumn] = useState(null)
  const [activeTask, setActiveTask] = useState(null)
  const { handleDragEnd, handleDragStart, handleDragOver } = useBoard({ setActiveColumn, setActiveTask })

  return (
    <div className='flex flex-col flex-1 bg-slate-700'>
      <h1>Kanban Board Component</h1>
      <div className='flex justify-center items-center bg-blue-400 gap-4 h-full'>
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columnsId}
            strategy={horizontalListSortingStrategy}
          >
            {
            columns.map(col => (
              <ColumnContainer key={col.id} column={col} tasks={tasks.filter(task => task.columnId === col.id)} />
            ))
          }
          </SortableContext>
          {
            createPortal(
              <DragOverlay>
                {
                  activeColumn && (
                    <ColumnContainer column={activeColumn} tasks={tasks.filter(task => task.columnId === activeColumn.id)} />
                  )
                }
                {
                  activeTask && (
                    <TaskItem task={activeTask} />
                  )
                }
              </DragOverlay>,
              document.body
            )
          }
        </DndContext>
        <div>
          <span>+</span>
          Add Column
        </div>
      </div>
    </div>
  )
}

export default KanbanBoard
