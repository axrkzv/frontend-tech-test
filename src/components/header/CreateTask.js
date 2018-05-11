import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { createTask } from 'actions'
import CreateTaskModal from './createTaskModal/CreateTaskModal'

class CreateTask extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayCreateTaskModal: false
    }
  }

  toggleDisplayCreateTaskModal = () => {
    this.setState(prevState => ({ displayCreateTaskModal: !prevState.displayCreateTaskModal }))
  }

  render() {
    const { data: { isLoading, status } } = this.props
    const { displayCreateTaskModal } = this.state

    if (isLoading) {
      return null
    }

    return (
      <div className="create-task-container">
        <Button
          title="Add task"
          className="btn-transparent"
          onClick={this.toggleDisplayCreateTaskModal}
        >
          <i className="fa fa-plus" />
        </Button>
        {displayCreateTaskModal &&
          <CreateTaskModal
            toggle={this.toggleDisplayCreateTaskModal}
            createTask={this.props.createTask}
            status={status}
          />}
      </div>
    )
  }
}

CreateTask.propTypes = {
  data: PropTypes.object.isRequired,
  createTask: PropTypes.func.isRequired
}

export default connect(state => ({ data: state.tasks }), {
  createTask
})(CreateTask)
