import React, { Component } from 'react'
import propTypes from 'prop-types'

class Stats extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stats: props.stats || []
    }

    this.updateStats = this.updateStats.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.incrementStat = this.incrementStat.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ stats: nextProps.stats })
  }

  updateStats(stats) {
    var data = {
      type: 'stats',
      data: stats
    }

    this.props.sendUpdate(data)
  }

  incrementStat(row, index, inc) {
    this.setState(prevState => {
      let stats = prevState.stats.slice()
      stats[row].values[index] = String(Number(stats[row].values[index]) + inc)
      this.updateStats(stats)
      return { stats }
    })
  }

  handleChange(e) {
    let row = e.target.name.split('-')[1]
    let index = e.target.name.split('-')[2]
    let value = e.target.value

    this.setState(prevState => {
      let stats = prevState.stats.slice()
      stats[row].values[index] = value
      this.updateStats(stats)
      return { stats }
    })
  }

  render() {
    return (
      <div className="stats">
        <h3 className="d-inline-block mt-4">Stats</h3>
        {this.state.stats.map((stat, index) => (
          <div
            key={stat.name}
            className="stats-row row justify-content-between mt-1 mb-1"
          >
            <span className="col-3">{stat.display_name}</span>
            <input
              name={`${stat.name}-${index}-0`}
              type="text"
              value={stat.values[0]}
              onChange={this.handleChange}
              className="form-control col-2"
              placeholder="Stat Value 1"
            />
            <span className="col-1">{stat.type === 'percentage' && '%'}</span>
            <button
              className="btn btn-secondary col-1"
              onClick={() => this.incrementStat(index, 0, stat.increment)}
            >
              <i className="fas fa-plus" />
            </button>
            <input
              name={`${stat.name}-${index}-1`}
              type="text"
              onChange={this.handleChange}
              value={stat.values[1]}
              className="form-control col-2"
              placeholder="Stat Value 2"
            />
            <span className="col-1">{stat.type === 'percentage' && '%'}</span>
            <button
              className="btn btn-secondary col-1"
              onClick={() => this.incrementStat(index, 1, stat.increment)}
            >
              <i className="fas fa-plus" />
            </button>
          </div>
        ))}
      </div>
    )
  }
}

export default Stats

Stats.propTypes = {
  sendUpdate: propTypes.func,
  stats: propTypes.array
}
