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
    const axiosOptions = {
      method: 'GET',
      url: this.state.serverAddress + '/games',
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    };
    axios(axiosOptions).then((resp) => {
      if (resp.data.success) {
        this.setState({
          gamesList: reponse.data.games
        })
      }
    }).catch((err) => {
      // TODO: Log Errors instead of printing them to console
      console.log(JSON.stringify(err))
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
