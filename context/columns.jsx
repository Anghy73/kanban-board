import { useReducer, createContext } from 'react'
import { reducerColumns, reducerColumnsInitialState } from '../reducer/reducerColumns'

export const ColumnsContext = createContext()

export function ColumnsProvider ({ children }) {
  const [state, dispatch] = useReducer(reducerColumns, reducerColumnsInitialState)

  const updateOrdenColumns = product => dispatch({
    type: 'UPDATE_ORDEN_COLUMNS',
    payload: product
  })

  const columnsId = state.map(col => col.id)

  return (
    <ColumnsContext.Provider value={{
      columns: state,
      columnsId,
      updateOrdenColumns
    }}
    >
      {children}
    </ColumnsContext.Provider>
  )
}
