import React, { Component } from 'react'
import propTypes from 'prop-types'

class Teams extends Component {
  constructor(props) {
    super(props)

    this.state = {
      teams: this.props.teams,
      score: this.props.score
    }

    this.handleChange = this.handleChange.bind(this)
    this.updateScore = this.updateScore.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ teams: nextProps.teams, score: nextProps.score })
  }

  updateScore(team, score, index) {
    var data = {
      type: 'event',
      data: {
        type: 'score',
        data: {
          type: 'reset',
          player_id: 0,
          team: team,
          score: score,
          team_index: index
        }
      }
    }

    this.props.sendUpdate(data)
  }

  handleChange(e) {
    let index = e.target.name.split('-')[1]
    let value = e.target.value

    this.setState(prevState => {
      let score = this.props.score.slice()
      score[index] = value
      this.updateScore(prevState.teams[index].shortname, score[index], index)
      return { score }
    })
  }

  render() {
    return (
      <div className="teams container-fluid widget">
        <h3 className="d-inline-block">Teams</h3>

        <div className="row">
          <div className="col-6">
            {`${this.state.teams[0].name} (${this.state.teams[0].shortname})`}
            <span
              className="team-colour-patch"
              style={{ backgroundColor: this.state.teams[0].color }}
            />
          </div>
          <div className="col-6">
            {`${this.state.teams[1].name} (${this.state.teams[1].shortname})`}
            <span
              className="team-colour-patch"
              style={{ backgroundColor: this.state.teams[1].color }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <input
              type="text"
              name="score-0"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.score[0]}
            />
          </div>
          <div className="col-6">
            <input
              name="score-1"
              type="text"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.score[1]}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Teams

Teams.propTypes = {
  data: propTypes.object,
  sendUpdate: propTypes.func
}
