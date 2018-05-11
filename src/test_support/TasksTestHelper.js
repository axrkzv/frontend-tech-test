import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Tasks from '../components/tasks/Tasks'
import { store } from '../store'

export class TasksTestHelper {

  constructor(data) {
    this.screen = mount(<Provider store={store}><Tasks
      checkIsPossibleToAddSubTask={() => true}
      data={data}
    /></Provider>)
  }

  getItems(selector) {
    return this.screen.find(selector).map(x => x.text())
  }
}
