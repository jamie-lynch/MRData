import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'

import Stats from './widgets/Stats'
import Teams from './widgets/Teams'
import Lineup from './widgets/Lineup'

import Loader from './elements/Loader'
import Navbar from './elements/Navbar'

import { observer, inject } from 'mobx-react'

class App extends Component {
  constructor(props) {
    super(props)

    this.ws = null
  }

  componentDidMount() {
    this.ws = new window.WebSocket(`ws://${window.location.hostname}:3001`)
    this.props.store.setInitialState(this.ws)
  }

  componentWillUnmount() {
    if (this.ws) {
      this.ws.close()
    }
  }

  render() {
    let store = this.props.store
    if (store.loading) {
      return <Loader />
    }

    let widgets = [
      { name: 'teams', Component: <Teams key="teams" /> },
      { name: 'stats', Component: <Stats key="stats" /> },
      { name: 'lineup', Component: <Lineup key="lineup" /> }
    ]

    return (
      <div className="App container">
        <h1>Match Report Data Input</h1>
        <p>Keep track of the game using the inputs below</p>

        <div>
          {widgets.map(
            widget => (store.widgets[widget.name] ? widget.Component : null)
          )}
        </div>

        <Navbar />
        <ToastContainer position="bottom-right" />
      </div>
    )
  }
}

export default inject('store')(observer(App))
