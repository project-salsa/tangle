import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider, observer } from 'mobx-react'

import stores from './stores'
import Router from './router'
import EntryPoint from './entry_point'

@observer
export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isReady: false
    }
  }

  async componentWillMount () {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    })

    this.setState({ isReady: true });
  }

  render () {
    if (this.state.isReady) {
      return (
        <Provider {...stores}>
          <EntryPoint/>
        </Provider>
      )
    } else {
      return null
    }
  }
}

AppRegistry.registerComponent('App', () => App)