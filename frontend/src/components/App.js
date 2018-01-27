import React, { Component } from 'react'
import request from 'superagent'
import { ToastContainer, toast } from 'react-toastify'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stats: [['', '', '']]
    }

    this.setInitialState = this.setInitialState.bind(this)
    this.listen = this.listen.bind(this)
    this.updateStats = this.updateStats.bind(this)
    this.handleStatsChange = this.handleStatsChange.bind(this)
    this.addStatsRow = this.addStatsRow.bind(this)
    this.removeStatsRow = this.removeStatsRow.bind(this)

    this.ws = null
  }

  componentDidMount() {
    this.setInitialState()
  }

  setInitialState() {
    this.ws = new window.WebSocket(`ws://${window.location.hostname}:3001`)
    this.listen(this.ws)
  }

  listen(ws) {
    ws.onmessage = received => {
      var msg = JSON.parse(received.data)
      var { type, data } = msg

      switch (type) {
        case 'stats':
          this.setState({ stats: data })
          break
        default:
          break
      }
    }
  }

  handleStatsChange(e) {
    let row = e.target.name.split('-')[1]
    let index = e.target.name.split('-')[2]
    let value = e.target.value
    this.setState(prevState => {
      let stats = prevState.stats.slice()
      stats[row][index] = value
      this.updateStats(stats)
      return { stats }
    })
  }

  addStatsRow() {
    this.setState(prevState => {
      let stats = prevState.stats.slice()
      stats.push(['', '', ''])
      this.updateStats(stats)
      return { stats }
    })
  }

  removeStatsRow(row) {
    this.setState(prevState => {
      let stats = prevState.stats.slice()
      stats.splice(row, 1)
      this.updateStats(stats)
      return { stats }
    })
  }

  updateStats(stats) {
    var data = {
      type: 'stats',
      data: stats
    }
    request
      .post(`//${window.location.hostname}:3001/update-data`)
      .set('Content-Type', 'application/json')
      .send(data)
      .end((err, res) => {
        if (err) toast.error(err.message || 'An unexpected error occurred')
      })
  }

  render() {
    return (
      <div className="App container">
        <h1>Match Report Data Input</h1>
        <p>Keep track of the game using the inputs below</p>

        <h3 className="d-inline-block mt-4">Stats</h3>
        <div className="stats">
          {this.state.stats.map((stat, index) => (
            <div
              key={`stat-${index}`}
              className="stats-row row justify-content-between mt-1 mb-1"
            >
              <input
                name={`stat-${index}-0`}
                type="text"
                value={stat[0]}
                onChange={this.handleStatsChange}
                className="form-control col-3"
                placeholder="Stat Name"
              />
              <input
                name={`stat-${index}-1`}
                type="text"
                value={stat[1]}
                onChange={this.handleStatsChange}
                className="form-control col-3"
                placeholder="Stat Value 1"
              />
              <input
                name={`stat-${index}-2`}
                type="text"
                onChange={this.handleStatsChange}
                value={stat[2]}
                className="form-control col-3"
                placeholder="Stat Value 2"
              />
              <button
                className="btn btn-danger"
                onClick={() => this.removeStatsRow(index)}
              >
                <i className="fas fa-minus" />
              </button>
            </div>
          ))}
          <div className="row justify-content-end">
            <button
              className="btn btn-seconday mt-4"
              onClick={this.addStatsRow}
            >
              <i className="fas fa-plus" />
            </button>
          </div>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    )
  }
}

export default App
