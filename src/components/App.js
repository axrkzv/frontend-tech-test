import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter, Switch } from 'react-router-dom'
import Async from 'react-code-splitting'
import Header from './header/Header'
import ToDoTasks from './tasks/ToDoTasks'
import DoneTasks from './tasks/DoneTasks'

import './app.scss'

const AllTasks = () => <Async load={import('./tasks/AllTasks')} />

class App extends Component {
  render() {
    const { location } = this.props
    return (
      <div className="app">
        <Header location={location} />
        <div className="tasks">
          <Switch>
            <Route exact path="/" component={AllTasks} />
            <Route path="/todo" component={ToDoTasks} />
            <Route path="/done" component={DoneTasks} />
          </Switch>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(App)
