import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'mobx-react'

import stores from './stores'
import { RootNavigator } from './router'

export default class App extends React.Component {
  render () {
    return (
      <Provider {...stores}>
        <RootNavigator />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('App', () => App)