import React from 'react'
import axios from 'axios'
import CreateRequestComponent from '../../components/create_request/create_request_component'
import { inject } from 'mobx-react'

@inject('authStore')
export default class CreateRequestView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      serverAddress: 'https://tangled.michaelbeaver.info',
      gamesList: []
    }
  }

  componentDidMount () {
    axios.get(this.state.serverAddress + '/games', { headers: { Authorization: `Bearer ${this.props.authStore.token}` } }).then((response) => {
      this.setState({
        gamesList: response.data.games
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <CreateRequestComponent
        serverAddress={this.state.serverAddress}
        navigation={this.props.navigation}
        gamesList={this.state.gamesList} />
    )
  }
}
