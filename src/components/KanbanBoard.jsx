import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useColumns } from '../hooks/useColumns'
import ColumnContainer from './ColumnContainer'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import TaskItem from './TaskItem'
import { useTasks } from '../hooks/useTasks'
import { useBoard } from '../hooks/useBoard'
import { CgAdd } from 'react-icons/cg'

function KanbanBoard () {
  const { columns, columnsId, addColumn } = useColumns()
  const { tasks } = useTasks()
  const [activeColumn, setActiveColumn] = useState(null)
  const [activeTask, setActiveTask] = useState(null)
  const { handleDragEnd, handleDragStart, handleDragOver } = useBoard({ setActiveColumn, setActiveTask })

  const handleAddColumn = () => {
    addColumn()
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )

  return (
    <div className='flex flex-col flex-1'>
      <h1>Kanban Board Component</h1>
      <div className='flex justify-center items-center gap-4 h-full px-10'>
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          sensors={sensors}
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
        <button onClick={handleAddColumn} className='flex justify-center items-center bg-slate-800 gap-2 text-lg py-3 rounded-md hover:bg-slate-700 w-full min-w-[350px] max-w-[350px]'>
          <CgAdd />
          Add Column
        </button>
      </div>
    </div>
  )
}

export default KanbanBoard
