import React, { Component } from 'react'
import request from 'superagent'
import { ToastContainer, toast } from 'react-toastify'
import Stats from './elements/Stats'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {}
    }

    this.setInitialState = this.setInitialState.bind(this)
    this.listen = this.listen.bind(this)
    this.sendUpdate = this.sendUpdate.bind(this)

    this.ws = null
  }

  componentDidMount() {
    this.setInitialState()
  }

  setInitialState() {
    request
      .get(`//${window.location.hostname}:3001/get-data`)
      .end((err, res) => {
        if (err) toast.error(err.message || 'An unexpected error occurred')

        this.setState({ data: res.body })
        this.ws = new window.WebSocket(`ws://${window.location.hostname}:3001`)
        this.listen(this.ws)
      })
  }

  listen(ws) {
    ws.onmessage = received => {
      var msg = JSON.parse(received.data)
      var { type, data } = msg

      switch (type) {
        case 'stats':
          this.setState(prevState => {
            let state = Object.assign({}, prevState.data)
            state.stats = data
            return { data: state }
          })
          break
        default:
          break
      }
    }
  }

  sendUpdate(message) {
    request
      .post(`//${window.location.hostname}:3001/update-data`)
      .set('Content-Type', 'application/json')
      .send(message)
      .end((err, res) => {
        if (err) toast.error(err.message || 'An unexpected error occurred')
      })
  }

  render() {
    return (
      <div className="App container">
        <h1>Match Report Data Input</h1>
        <p>Keep track of the game using the inputs below</p>

        <Stats sendUpdate={this.sendUpdate} stats={this.state.data.stats} />

        <ToastContainer position="bottom-right" />
      </div>
    )
  }
}

export default App
