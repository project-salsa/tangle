import React from 'react'
import axios from 'axios'
import DashboardComponent from '../../components/dashboard/dashboard_component'
import Loader from '../../components/Loader'
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

  getRequests (action, filters) {
    this.setState({
      isLoading: true
    })
    let requestOptions = {
      method: 'GET',
      url: 'https://tangled.michaelbeaver.info/requests',
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    }
    if (action === 'Feed') {
      const subscribedTags = this.props.authStore.user.subscribedTags
      let tags = '?'
      for (tag of subscribedTags) {
        tags += 'tags[]=' + tag + '&'
      }
      requestOptions.url += tags
      if (subscribedTags && subscribedTags.length > 0) {
        requestOptions.url += tags
      }
    } else if (action === 'Self') {
      requestOptions.params = {
        user: this.props.authStore.user.username
      }
    } else if (action === 'Joined') {
      requestOptions.params = {
        joined: true
      }
    }
    axios(requestOptions).then((response) => {
      if (response.data.success) {
        this.setState({
          requests: response.data.requests,
          isLoading: false
        })
      }
    }).catch((err) => {
      // TODO: Error handling
      console.log('Dashboard Container Axios Error ', err.message)
      this.setState({
        isLoading: false
      })
    })
  }

  componentDidMount () {
    // Run it initially, as the component mounts.
    this.getRequests(this.props.action, this.props.filters)
  }

  render () {
    if (this.state.isLoading) { return ( <Loader /> ) }
    return (
      <DashboardComponent requests={this.state.requests} navigation={this.props.navigation} />
    )
  }
}

DashboardContainer.defaultProps = {
  action: '',  // Should be 'Feed', 'Self' or 'Joined'.
  filters: []
}
