import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from 'components/shared/spinner'
import Masonry from 'react-masonry-component'
import ReactPaginate from 'react-paginate'
import Task from './task/Task'

const masonryOptions = {
  transitionDuration: 0,
  horizontalOrder: true
}

class Tasks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedPage: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedPage } = this.state
    const { data: { pages, status: statusFilter }, status, loadTasks } = this.props
    this.paginateOptions = {}
    // if (pages && nextProps.data.pages > pages && status === statusFilter) {
    //   const page = nextProps.data.pages - 1
    //   this.props.loadTasks({ status }, page)
    //   this.paginateOptions = { forcePage: page }
    // }
    if (pages && nextProps.data.pages < pages && selectedPage === pages - 1) {
      const page = nextProps.data.pages - 1
      this.setState({ selectedPage: page })
      loadTasks({ status }, page)
      this.paginateOptions = { forcePage: page }
    }
  }

  handlePageClick = ({ selected }) => {
    const { loadTasks, status } = this.props
    this.setState({ selectedPage: selected })
    loadTasks({ status }, selected)
  }

  render() {
    const { selectedPage } = this.state
    const { data: { items: tasks, pages }, checkIsPossibleToAddSubTask, status } = this.props
    const tasksInfo = {
      status,
      selectedPage
    }

    if (!tasks) {
      return <Spinner />
    }

    return (
      <div>
        <Masonry
          className={'tasks-list'}
          elementType={'div'}
          options={masonryOptions}
        >
          {tasks.map(x => (<Task
            key={x.id}
            task={x}
            isPossibleToAddSubTask={checkIsPossibleToAddSubTask(x)}
            tasksInfo={tasksInfo}
          />))}
        </Masonry>
        {pages > 1 && <ReactPaginate
          initialPage={5}
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageLinkClassName={'page-link'}
          previousLinkClassName={'previous-page-link'}
          nextLinkClassName={'next-page-link'}
          {...this.paginateOptions}
        />}
      </div>
    )
  }
}

Tasks.propTypes = {
  data: PropTypes.object,
  loadTasks: PropTypes.func,
  status: PropTypes.string,
  checkIsPossibleToAddSubTask: PropTypes.func.isRequired
}

export default Tasks
