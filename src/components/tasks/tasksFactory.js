import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadTasks } from 'actions'
import Tasks from './Tasks'

const checkIsPossibleToAddSubTaskDefault = task => true

export default function tasksFactory(status, checkIsPossibleToAddSubTask = checkIsPossibleToAddSubTaskDefault) {
  class TasksComponent extends Component {
    componentDidMount() {
      this.props.loadTasks({ status })
    }

    render() {
      const { data, loadTasks: loadTasksAction } = this.props
      return (
        <Tasks
          data={data}
          loadTasks={loadTasksAction}
          status={status}
          checkIsPossibleToAddSubTask={checkIsPossibleToAddSubTask}
        />
      )
    }
  }

  TasksComponent.propTypes = {
    data: PropTypes.object.isRequired,
    loadTasks: PropTypes.func.isRequired
  }

  return connect(
    state => ({
      data: state.tasks
    }), {
      loadTasks
    }
  )(TasksComponent)
}
