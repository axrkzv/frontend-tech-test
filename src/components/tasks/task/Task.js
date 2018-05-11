import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { updateTask, deleteTask } from 'actions'
import update from 'immutability-helper'
import { Button } from 'reactstrap'
import { TASK_STATUSES, TASK_STATUSES_LABELS } from 'constants/taskStatuses'
import UpdateTaskModal from './updateTaskModal/UpdateTaskModal'
import SubTasks from './subTasks/SubTasks'
import AddSubTask from './AddSubTask'
import './task.scss'

class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayUpdateTaskModal: false
    }
  }

  endDragHandler = (subTask) => {
    const { task, task: { subTasks }, tasksInfo } = this.props
    const draggedSubTaskIndex = subTasks.findIndex(x => x.id === subTask.id)
    if (draggedSubTaskIndex === subTask.index) {
      return
    }
    const draggedSubTask = subTasks[draggedSubTaskIndex]
    const newSubTasks = update(subTasks, {
      $splice: [[draggedSubTaskIndex, 1], [subTask.index, 0, draggedSubTask]]
    })
    this.props.updateTask({ ...task, subTasks: newSubTasks }, tasksInfo)
  }

  toggleDisplayUpdateTaskModal = () => {
    this.setState(prevState => ({ displayUpdateTaskModal: !prevState.displayUpdateTaskModal }))
  }

  render() {
    const { isPossibleToAddSubTask, task, tasksInfo } = this.props
    const { id, name, description, status, subTasks } = task
    const { displayUpdateTaskModal } = this.state

    return (
      <div className="task-container">
        <div className="task-container__content">
          <div className="task-container__content__title">
            <div className="task-container__content__name">
              {name}
            </div>
            <Button
              title="Edit task"
              className="btn-transparent"
              onClick={this.toggleDisplayUpdateTaskModal}
            >
              <i className="fa fa-edit" />
            </Button>
          </div>
          <div className="task-container__content__status">
            Status: <span className={classnames('task-container__content__status__label',
              { 'label-done': TASK_STATUSES.DONE === status },
              { 'label-todo': TASK_STATUSES.TODO === status })}
            >
              {TASK_STATUSES_LABELS[status]}
            </span>
          </div>
          {description && <div className="task-container__content__description">
            {description}
          </div>}
          <SubTasks
            subTasks={subTasks}
            endDragHandler={this.endDragHandler}
          />
          {isPossibleToAddSubTask && <AddSubTask id={id} />}
          {displayUpdateTaskModal && <UpdateTaskModal
            task={task}
            tasksInfo={tasksInfo}
            toggle={this.toggleDisplayUpdateTaskModal}
            updateTask={this.props.updateTask}
            deleteTask={this.props.deleteTask}
          />}
        </div>
      </div>
    )
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    subTasks: PropTypes.array.isRequired
  }).isRequired,
  isPossibleToAddSubTask: PropTypes.bool,
  tasksInfo: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
}

Task.defaultProps = {
  isPossibleToAddSubTask: true
}

export default connect(null, {
  updateTask,
  deleteTask
})(Task)
