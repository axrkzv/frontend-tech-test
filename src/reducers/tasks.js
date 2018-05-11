import * as types from 'constants/actionTypes'
import { TASK_STATUSES } from 'constants/taskStatuses'
import update from 'immutability-helper'

const PAGE_LIMIT = 50

const initialState = {}

const findTaskIndexById = (items, id) => items.findIndex(x => x.id === id)

export default function tasks(state = initialState, action) {
  let newState = state

  switch (action.type) {
    case types.TASKS_FETCH_COMPLETED: {
      newState = {
        items: action.payload.tasks,
        pages: action.payload.pages,
        status: action.payload.status
      }
      break
    }
    case types.TASK_POST_COMPLETED: {
      const { task, pages } = action.payload
      let items = newState.items
      if (TASK_STATUSES.DONE !== newState.status &&
        newState.pages === pages &&
        newState.items.length < PAGE_LIMIT) {
        items = update(newState.items, { $push: [task] })
      }
      newState = {
        ...newState,
        items,
        pages
      }
      break
    }
    case types.TASK_UPDATE_COMPLETED: {
      const { task, lastTask, pages } = action.payload
      const taskIndex = findTaskIndexById(newState.items, task.id)
      let items
      if (newState.status && task.status !== newState.status) {
        items = update(newState.items, {
          $splice: [[taskIndex, 1]]
        })
        if (lastTask && items.length > 0 && lastTask.id !== items[items.length - 1].id) {
          items.push(lastTask)
        }
      } else {
        items = update(newState.items, {
          [taskIndex]: { $set: task }
        })
      }
      if (taskIndex >= 0) {
        newState = {
          ...newState,
          items,
          pages
        }
      }
      break
    }
    case types.SUB_TASK_POST_COMPLETED:
    case types.SUB_TASK_UPDATE_COMPLETED:
    case types.SUB_TASK_DELETE_COMPLETED: {
      const task = action.payload
      const taskIndex = findTaskIndexById(newState.items, task.id)
      if (taskIndex >= 0) {
        newState = {
          ...newState,
          items: update(newState.items, {
            [taskIndex]: { $set: task }
          })
        }
      }
      break
    }
    case types.TASK_DELETE_COMPLETED: {
      const { task, lastTask, pages } = action.payload
      const taskIndex = findTaskIndexById(newState.items, task.id)
      if (taskIndex >= 0) {
        const items = update(newState.items, { $splice: [[taskIndex, 1]] })
        if (lastTask && items.length > 0 && lastTask.id !== items[items.length - 1].id) {
          items.push(lastTask)
        }
        newState = {
          ...newState,
          items,
          pages
        }
      }
      break
    }
    default:
      break
  }

  return newState
}
