import BaseService from './BaseService'

export default class TasksService extends BaseService {
  constructor() {
    super()
    this.path = 'tasks'
  }

  loadTasks(page, queries) {
    return this.request.get().url(page.toString()).queries(queries).send()
  }
}
