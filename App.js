import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider, observer } from 'mobx-react'

import stores from './stores'
import Router from './router'
import EntryPoint from './entry_point'

@observer
export default class App extends React.Component {
  render () {
    return (
      <Provider {...stores}>
        <EntryPoint />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('App', () => App)