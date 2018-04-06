import React from 'react'
import { observer, inject } from 'mobx-react'

let widgets = [
  { name: 'teams', label: 'Teams' },
  { name: 'stats', label: 'Stats' },
  { name: 'lineups', label: 'Lineups' }
]

const Navbar = ({ store }) => (
  <nav className="navbar fixed-bottom justify-content-start">
    <span className="navbar-brand">
      <i className="fas fa-cog fa-lg" />
    </span>

    <div className="display-checks">
      {widgets.map(widget => (
        <div className="form-check" key={widget.name}>
          <input
            type="checkbox"
            className="form-check-input"
            id={widget.name}
            checked={store.widgets[widget.name]}
            onChange={() => store.toggleWidget(widget.name)}
          />
          <label className="form-check-label" htmlFor={widget.name}>
            {widget.label}
          </label>
        </div>
      ))}
    </div>
  </nav>
)

export default inject('store')(observer(Navbar))
