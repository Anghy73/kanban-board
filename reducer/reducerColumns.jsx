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

const generateId = () => {
  return Math.floor(Math.random() * 10001)
}

export const reducerColumns = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case 'ADD_COLUMN': {
      const newState = [
        ...state,
        {
          id: generateId(),
          title: `Column ${state.length + 1}`
        }
      ]
      return newState
    }

    case 'DELETE_COLUMN': {
      const newState = state.filter(item => item.id !== actionPayload.id)
      return newState
    }

    case 'UPDATE_ORDEN_COLUMNS': {
      return actionPayload
    }

    case 'UPDATE_TITLE_COLUMN': {
      const { column, newTitle } = actionPayload
      const newState = state.map(item => {
        if (item.id === column.id) {
          return {
            ...item,
            title: newTitle
          }
        }
        return item
      })
      return newState
    }
  }
}
