import { TasksTestHelper } from 'test_support'

const data = {
  items: [
    {
      id: 1,
      name: 'Task1',
      description: 'Description1',
      status: 'ToDo',
      subTasks: []
    },
    {
      id: 2,
      name: 'Task2',
      description: 'Description2',
      status: 'ToDo',
      subTasks: []
    }
  ],
  pages: 1
}

let app

beforeEach(() => {
  app = new TasksTestHelper(data)
})

it('tasks-list-test', () => {
  const names = app.getItems('.task-container__content__name')
  const descriptions = app.getItems('.task-container__content__description')
  expect(names).toEqual(['Task1', 'Task2'])
  expect(descriptions).toEqual(['Description1', 'Description2'])
})
