import React from 'react'

const MainControls = ({ values, onCheckClick }) => (
  <nav className="navbar fixed-bottom justify-content-start">
    <span className="navbar-brand">
      <i className="fas fa-cog fa-lg" />
    </span>

    <div className="display-checks">
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="teams"
          checked={values.teams}
          onChange={onCheckClick}
        />
        <label className="form-check-label" htmlFor="teams">
          Teams
        </label>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="stats"
          checked={values.stats}
          onChange={onCheckClick}
        />
        <label className="form-check-label" htmlFor="stats">
          Stats
        </label>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="lineups"
          checked={values.lineups}
          onChange={onCheckClick}
        />
        <label className="form-check-label" htmlFor="lineups">
          Lineups
        </label>
      </div>
    </div>
  </nav>
)

export default MainControls
