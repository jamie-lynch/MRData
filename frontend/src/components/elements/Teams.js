import React, { Component } from 'react'
import propTypes from 'prop-types'

class Teams extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data
    }

    this.handleChange = this.handleChange.bind(this)
    this.updateScore = this.updateScore.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })
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
      let data = Object.assign({}, prevState.data)
      let score = data.score.slice()
      score[index] = value
      data.score = score
      this.updateScore(data.teams[index].shortname, score[index], index)
      return { data }
    })
  }

  render() {
    return (
      <div className="teams container-fluid">
        <h3 className="d-inline-block mt-4">Teams</h3>

        <div className="row">
          <div className="col-6">
            {`${this.state.data.teams[0].name} (${
              this.state.data.teams[0].shortname
            })`}
            <span
              className="team-colour-patch"
              style={{ backgroundColor: this.state.data.teams[0].color }}
            />
          </div>
          <div className="col-6">
            {`${this.state.data.teams[1].name} (${
              this.state.data.teams[1].shortname
            })`}
            <span
              className="team-colour-patch"
              style={{ backgroundColor: this.state.data.teams[1].color }}
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
              value={this.state.data.score[0]}
            />
          </div>
          <div className="col-6">
            <input
              name="score-1"
              type="text"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.data.score[1]}
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
