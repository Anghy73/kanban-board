import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function ColumnContainer ({ column }) {
  // console.log(column)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className='bg-emerald-500 w-52 h-56'>hola mundo</div>
    )
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='bg-red-400 w-52 h-56'>
      <h1>{column.title}</h1>
      <span>Column Container Component</span>
    </div>
  )
}

export default ColumnContainer
