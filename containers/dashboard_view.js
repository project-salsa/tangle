import React from 'react'
import axios from 'axios'
import Dashboard from '../components/dashboard/dashboard'

export default class DashboardView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      requests: []
    }
  }

  componentDidMount () {
    axios.get('url').then((data) => {
      this.setState({
        requests: data
      })
    }).catch((err) => {
     // TODO: handle errors more properly, but I think this is fine for now. It'll just return an empty list to the component
    })
  }

  render () {
    return (
      <Dashboard navigation={this.props.navigation} />
    )
  }
}