import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

class Teams extends Component {
  render() {
    let store = this.props.store
    return (
      <div className="teams container-fluid widget">
        <h3 className="d-inline-block">Teams</h3>

        <div className="row">
          {store.teams.map(team => (
            <div className="col-6" key={team.name}>
              {`${team.name} (${team.shortName})`}
              <span
                className="team-colour-patch"
                style={{ backgroundColor: team.color }}
              />
            </div>
          ))}
        </div>

        <div className="row">
          {store.teams.map((team, index) => (
            <div className="col-6" key={team.name}>
              <input
                type="text"
                key={team.name}
                name={`score-${index}`}
                className="form-control"
                value={store.tempScores[index] || store.scores[index]}
                onChange={store.updateScore}
                onBlur={store.updateScore}
                onKeyPress={store.updateScore}
              />
            </div>
          ))}
        </div>
        <div className="text-danger mt-2">
          Only use these inputs to reset the score if you screw it up. Use the
          buttons below to update to properly. An update will be sent as soon as
          you click out of the input or hit enter.
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(Teams))
