export const reducerTasksInitialState = JSON.parse(window.localStorage.getItem('tasksKanban')) || [
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
      window.localStorage.setItem('tasksKanban', JSON.stringify(newState))
      return newState
    }

    case 'UPDATE_ORDEN_TASKS': {
      window.localStorage.setItem('tasksKanban', JSON.stringify(actionPayload))
      return actionPayload
    }

    case 'DELETE_TASK': {
      let newState
      if (actionPayload.length) {
        newState = state.filter(item => item.columnId !== actionPayload[0].columnId)
      } else {
        newState = state.filter(item => item.id !== actionPayload.id)
      }
      window.localStorage.setItem('tasksKanban', JSON.stringify(newState))
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
      window.localStorage.setItem('tasksKanban', JSON.stringify(newState))

      return newState
    }
  }
}
