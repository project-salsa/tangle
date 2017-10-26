import React from 'react'
import axios from 'axios'
import DashboardComponent from '../components/dashboard/dashboard_component'

export default class DashboardContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      requests: []
    }
  }

  componentDidMount () {
    return axios.get('https://tangled.michaelbeaver.info/requests/').then((response) => {
      this.setState({
        requests: response.data.requests
      })
    }).catch((err) => {
     // TODO: handle errors more properly, but I think this is fine for now. It'll just return an empty list to the component
    })
  }

  render () {
    return (
      <DashboardComponent requests={this.state.requests} navigation={this.props.navigation} />
    )
  }
}
