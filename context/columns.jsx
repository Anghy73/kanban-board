import { useReducer, createContext } from 'react'
import { reducerColumns, reducerColumnsInitialState } from '../reducer/reducerColumns'

export const ColumnsContext = createContext()

export function ColumnsProvider ({ children }) {
  const [state, dispatch] = useReducer(reducerColumns, reducerColumnsInitialState)

  const addColumn = product => dispatch({
    type: 'ADD_COLUMN',
    payload: product
  })

  const delColumn = product => dispatch({
    type: 'DELETE_COLUMN',
    payload: product
  })

  const updateOrdenColumns = product => dispatch({
    type: 'UPDATE_ORDEN_COLUMNS',
    payload: product
  })

  const updateTitleColumn = product => dispatch({
    type: 'UPDATE_TITLE_COLUMN',
    payload: product
  })

  const columnsId = state.map(col => col.id)

  return (
    <ColumnsContext.Provider value={{
      columns: state,
      columnsId,
      addColumn,
      delColumn,
      updateOrdenColumns,
      updateTitleColumn
    }}
    >
      {children}
    </ColumnsContext.Provider>
  )
}
