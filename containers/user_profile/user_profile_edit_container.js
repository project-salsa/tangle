import React from 'react'
import UserProfileEdit from '../../components/user_profile/user_profile_edit'

export default class UserProfileEditContainer extends React.Component {

  render () {
    return (
      <UserProfileEdit
        navigation={this.props.navigation}
      />
    )
  }
}