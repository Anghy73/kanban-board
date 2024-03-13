export const reducerColumnsInitialState = [
  {
    id: 'todo',
    title: 'Todo'
  },
  {
    id: 'doing',
    title: 'Work in Progress'
  },
  {
    id: 'done',
    title: 'Done'
  }
]

export const reducerColumns = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case 'ADD_COLUMN': {
      return state
    }

    case 'UPDATE_ORDEN_COLUMNS': {
      return actionPayload
    }
  }
}
