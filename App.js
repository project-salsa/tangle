import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'mobx-react'

import stores from './stores'
import Router from './router'

class App extends React.Component {
  render () {
    return (
      <Provider {...stores}>
        <Router />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('App', () => App)