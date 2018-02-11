import React, { Component } from 'react'
import propTypes from 'prop-types'

class Lineup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lineup: this.props.data.lineup,
      events: this.props.data.events,
      teams: this.props.data.teams,
      score: this.props.data.score,
      stats: this.props.data.stats
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      lineup: nextProps.data.lineup,
      events: nextProps.data.events,
      teams: nextProps.data.teams,
      score: nextProps.data.score,
      stats: nextProps.data.stats
    })
  }

  handleClick(event, player, team_index) {
    let msg

    let stat_index = this.state.stats.findIndex(
      stat => stat.name === event.stats
    )

    let stat_value =
      Number(this.state.stats[stat_index].values[team_index]) +
      Number(this.state.stats[stat_index].increment)

    this.props.updateStats(stat_index, stat_value, team_index)

    switch (event.type) {
      case 'score':
        msg = {
          type: 'event',
          data: {
            type: event.type,
            data: {
              score: this.state.score[team_index] + event.inc,
              player_id: player.number,
              team: this.state.teams[team_index].shortname,
              type: event.subtype,
              display: event.display,
              time: Date.now(),
              team_index
            }
          }
        }
        break
      default:
        msg = {
          type: 'event',
          data: {
            type: event.type,
            data: {
              player_id: player.number,
              team: this.state.teams[team_index].shortname,
              time: Date.now(),
              team_index
            }
          }
        }
        break
    }
    this.props.sendUpdate(msg)
  }

  render() {
    return (
      <div className="lineup container-fluid widget">
        <h3 className="d-inline-block">Lineup</h3>

        <div className="row">
          <div className="col-6">
            {this.state.lineup[0].map(player => (
              <div key={player.number} className="row">
                <span className="col-1">{player.number}</span>
                <span className="col-1">-</span>
                <span className="col-3">{`${player.firstname} ${
                  player.surname
                }`}</span>
                <span className="col-7">
                  {this.state.events.map(event => (
                    <button
                      key={event.display}
                      onClick={() => this.handleClick(event, player, 0)}
                    >
                      {event.display}
                    </button>
                  ))}
                </span>
              </div>
            ))}
          </div>
          <div className="col-6">
            {this.state.lineup[1].map(player => (
              <div key={player.number} className="row">
                <span className="col-1">{player.number}</span>
                <span className="col-1">-</span>
                <span className="col-3">{`${player.firstname} ${
                  player.surname
                }`}</span>
                <span className="col-7">
                  {this.state.events.map(event => (
                    <button
                      key={event.display}
                      onClick={() => this.handleClick(event, player, 1)}
                    >
                      {event.display}
                    </button>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Lineup

Lineup.propTypes = {
  lineup: propTypes.array,
  events: propTypes.array,
  updateStats: propTypes.func
}
