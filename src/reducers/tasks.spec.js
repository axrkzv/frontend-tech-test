import * as types from 'constants/actionTypes'
import { tasksMock } from 'mocks/tasks'
import tasks from './tasks'

describe('Test tasks reducer', () => {
  it('reducer for TASKS_FETCH_COMPLETED', () => {
    let state = {}
    state = tasks(state, { type: types.TASKS_FETCH_COMPLETED,
      payload: {
        tasks: tasksMock.tasks,
        pages: 1
      }
    })
    expect(state).toEqual({ items: tasksMock.tasks, pages: 1 })
  })
  it('reducer for TASK_POST_COMPLETED', () => {
    let state = { items: tasksMock.tasks, pages: 1 }
    state = tasks(state, { type: types.TASK_POST_COMPLETED,
      payload: {
        task: tasksMock.tasks[0],
        pages: 1
      }
    })
    expect(state).toEqual({ items: [...tasksMock.tasks, tasksMock.tasks[0]], pages: 1 })
  })
  it('reducer for TASK_UPDATE_COMPLETED', () => {
    let state = { items: tasksMock.tasks, pages: 1 }
    const newTask = { ...tasksMock.tasks[0], status: 'Done' }
    state = tasks(state, { type: types.TASK_UPDATE_COMPLETED,
      payload: {
        task: newTask,
        pages: 1,
        lastTask: tasksMock.tasks[tasksMock.tasks.length - 1]
      }
    })
    const newTasks = tasksMock.tasks.map(x => x).splice(1)
    expect(state).toEqual({ items: [newTask, ...newTasks], pages: 1 })
  })
  it('reducer for TASK_DELETE_COMPLETED', () => {
    let state = { items: tasksMock.tasks, pages: 1 }
    const newTasks = tasksMock.tasks.map(x => x).splice(1)
    state = tasks(state, { type: types.TASK_DELETE_COMPLETED,
      payload: {
        task: tasksMock.tasks[0],
        pages: 1
      }
    })
    expect(state).toEqual({ items: [...newTasks], pages: 1 })
  })
})
