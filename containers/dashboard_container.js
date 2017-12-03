import React from 'react'
import axios from 'axios'
import DashboardComponent from '../components/dashboard/dashboard_component'
import Loader from '../components/Loader'
import { inject } from 'mobx-react'

@inject('authStore')
export default class DashboardContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      requests: [],
      isLoading: false
    }
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    const axiosOptions = {
      method: 'GET',
      url: 'https://tangled.michaelbeaver.info/requests/',
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    }
    return axios(axiosOptions).then((response) => {
      if (response.data.success) {
        this.setState({
          requests: response.data.requests
        })
      }
      console.log(response.data)
      this.setState({ isLoading: false })
    }).catch((err) => {
      // TODO: handle errors more properly, but I think this is fine for now. It'll just return an empty list to the component
      console.log('Axios Error', err.message)
      this.setState({ isLoading: false })
    })
  }

  render () {
    if (this.state.isLoading) { return ( <Loader /> ) }
    return (
      <DashboardComponent requests={this.state.requests} navigation={this.props.navigation} />
    )
  }
}
