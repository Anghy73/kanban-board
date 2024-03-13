import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useColumns } from '../hooks/useColumns'
import ColumnContainer from './ColumnContainer'
import { createPortal } from 'react-dom'
import { useState } from 'react'

function KanbanBoard () {
  const { columns, columnsId } = useColumns()
  const [activeColumn, setActiveColumn] = useState(null)
  // console.log(columns)
  // console.log(columnsId)

  const handleDragStart = (evt) => {
    console.log('drag Start')
    const { active } = evt

    if (active.data.current.type === 'Column') {
      setActiveColumn(active.data.current.column)
    }
  }

  const handleDragOver = () => {
    console.log('drag Over')
  }

  const handleDragEnd = (evt) => {
    console.log('drag End')

    // const { active, over } = evt
    setActiveColumn(null)

    // console.log(active)
    // console.log(over)
  }

  console.log(activeColumn)

  return (
    <div className='flex flex-col flex-1 bg-slate-700'>
      <h1>Kanban Board Component</h1>
      <div className='bg-blue-400 flex gap-4 min-h-72'>
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
              <ColumnContainer key={col.id} column={col} />
            ))
          }
          </SortableContext>
          {
            createPortal(
              <DragOverlay>
                {
                  activeColumn && (
                    <ColumnContainer column={activeColumn} />
                  )
                }
              </DragOverlay>,
              document.body
            )
          }
        </DndContext>
      </div>
      <button>Add Column</button>
    </div>
  )
}

export default KanbanBoard
