import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import store from './stores'

import './index.css'

useStrict(true)

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
