import { useContext } from 'react'
import { ColumnsContext } from '../../context/columns'

export function useColumns () {
  const columns = useContext(ColumnsContext)
  if (columns === undefined) {
    throw new Error('useTodos must be used within a TodosProvider')
  }
  return columns
}
