import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

const mount = document.getElementById('mount')

ReactDOM.render(
  <AppContainer component={App} />,
  mount
)

if (module.hot) {
  module.hot.accept('./components/app', () => {
    const NextApp = require('./components/app').default
    ReactDOM.render(
      <AppContainer component={NextApp} />,
      mount
    )
  })
}
