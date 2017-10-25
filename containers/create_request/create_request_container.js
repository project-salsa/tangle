import React from 'react'
import axios from 'axios'
import CreateRequestComponent from '../../components/create_request/create_request_component'
const serverAddress = 'https://tangled.michaelbeaver.info'

export default class CreateRequestView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gamesList: []
    }
  }

  componentDidMount () {
    axios.get(serverAddress + '/games').then((data) => {
      this.setState({
        gamesList: data.games
      })
    }, (err) => {
      console.log(err)
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <CreateRequestComponent
        serverAddress={serverAddress}
        navigation={this.props.navigation}
        gamesList={this.state.gamesList} />
    )
  }
}
