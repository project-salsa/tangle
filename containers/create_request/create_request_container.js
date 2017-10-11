import React from 'react'
import axios from 'axios'
import CreateRequestComponent from '../../components/create_request/create_request_component'

export default class CreateRequestView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      gamesList: [],
      newPost: undefined
    }
  }

  componentDidMount () {
    axios.get('something').then((data) => {
      this.setState({
        gamesList: data
      })
    }, (err) => {
      console.log(err)
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <CreateRequestComponent games={this.gamesList} />
    )
  }
}
