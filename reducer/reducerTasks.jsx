export const reducerTasksInitialState = [
  {
    id: 1,
    content: 'Task 1',
    columnId: 'todo'
  },
  {
    id: 2,
    content: 'Task 2',
    columnId: 'todo'
  },
  {
    id: 3,
    content: 'Task 3',
    columnId: 'todo'
  }
]

const generateId = () => {
  return Math.floor(Math.random() * 10001)
}

export const reducerTasks = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case 'ADD_TASK': {
      const { column } = actionPayload
      const newState = [
        ...state,
        {
          id: generateId(),
          content: `Task ${state.length + 1}`,
          columnId: column.id
        }
      ]
      return newState
    }

    case 'UPDATE_ORDEN_TASKS': {
      return actionPayload
    }

    case 'DELETE_TASK': {
      let newState
      if (actionPayload.length) {
        newState = state.filter(item => item.columnId !== actionPayload[0].columnId)
      } else {
        newState = state.filter(item => item.id !== actionPayload.id)
      }
      return newState
    }

    case 'UPDATE_TEXT_TASK': {
      const { task, newText } = actionPayload
      const newState = state.map(item => {
        if (item.id === task.id) {
          return {
            ...item,
            content: newText
          }
        }
        return item
      })
      return newState
    }
  }
}
