export const reducerTasksInitialState = [
  {
    id: 1,
    content: 'todo todo',
    columnId: 'todo'
  },
  {
    id: 4,
    content: 'todo2 todo',
    columnId: 'todo'
  },
  {
    id: 2,
    content: 'doing doing',
    columnId: 'doing'
  },
  {
    id: 3,
    content: 'done done',
    columnId: 'done'
  }
]

export const reducerTasks = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case 'ADD_TASK': {
      console.log('add')
      return state
    }

    case 'UPDATE_ORDEN_TASKS': {
      // console.log('UPDATE')
      return actionPayload
    }
  }
}
