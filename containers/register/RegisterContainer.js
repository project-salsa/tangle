import React from 'react'
import RegisterComponent from '../../components/register/register_component'

export default class RegisterContainer extends React.Component {
  render () {
    return (
      <RegisterComponent navigation={this.props.navigation} />
    )
  }
}
