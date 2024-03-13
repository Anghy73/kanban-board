import { useReducer, createContext } from 'react'
import { reducerColumns, reducerColumnsInitialState } from '../reducer/reducerColumns'

export const ColumnsContext = createContext()

export function ColumnsProvider ({ children }) {
  const [state, dispatch] = useReducer(reducerColumns, reducerColumnsInitialState)

  const columnsId = state.map(col => col.id)

  return (
    <ColumnsContext.Provider value={{
      columns: state,
      columnsId
    }}
    >
      {children}
    </ColumnsContext.Provider>
  )
}
