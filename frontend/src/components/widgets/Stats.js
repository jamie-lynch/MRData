import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'

class Stats extends Component {
  render() {
    let store = this.props.store
    return (
      <div className="stats container-fluid widget">
        <h3 className="d-inline-block">Stats</h3>

        {Object.keys(store.stats).map((key, index) => {
          let stat = store.stats[key]
          return (
            <div
              key={stat.name}
              className="stats-row row justify-content-between mt-1 mb-1"
            >
              <span className="col-3">{stat.label}</span>

              {stat.values.map((value, index2) => {
                return (
                  <Fragment key={`${stat.name}-${index}-${index2}`}>
                    <div className="input-group col-3">
                      <input
                        name={`${stat.name}-${index}-${index2}`}
                        type="text"
                        className="form-control"
                        placeholder={`Stat Value ${index2 + 1}`}
                        value={
                          store.tempStats[stat.name] &&
                          (store.tempStats[stat.name][index2] ||
                            store.tempStats[stat.name][index2] === 0)
                            ? store.tempStats[stat.name][index2]
                            : value
                        }
                        onChange={store.updateStats}
                        onBlur={store.updateStats}
                        onKeyPress={store.updateStats}
                      />
                      <div className="input-group-append">
                        <span
                          className="input-group-text stats-input-icon"
                          id="basic-addon1"
                        >
                          {stat.type === 'percentage' && '%'}
                        </span>
                      </div>
                    </div>
                    <span className="col-1">
                      <button
                        className="btn btn-secondary btn-plus"
                        name={`${stat.name}-${index}-${index2}`}
                        onClick={store.updateStats}
                      >
                        +
                      </button>
                    </span>
                  </Fragment>
                )
              })}
            </div>
          )
        })}

        <div className="text-danger mt-3">
          For all absolute values the increment buttons should be used to modify
          stats. This will trigger an event an update other values (e.g. score)
          accordingly. When editing manually, the update will be sent either
          after hitting enter or clicking out of the input. This will trigger a
          silent reset for score statistics (i.e penalty) so only use it if you
          have made a mistake.
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(Stats))
