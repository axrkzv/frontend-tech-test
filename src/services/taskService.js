import BaseService from './BaseService'

export default class TaskService extends BaseService {
  constructor() {
    super()
    this.path = 'task'
  }

  createTask(task, queries = {}) {
    return this.request.post().body(task).url('create').queries(queries)
      .send()
  }

  updateTask(task, queries = {}) {
    return this.request.put().body(task).url(`update/${task.id}`).queries(queries)
      .send()
  }

  deleteTask(task, queries = {}) {
    return this.request.del().url(`delete/${task.id}`).queries(queries).send()
  }
}
