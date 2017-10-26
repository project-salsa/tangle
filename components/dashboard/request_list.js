import React from 'react'
import { View } from 'react-native'

import RequestCard from '../common/request_card'

export default class RequestList extends React.Component {
  render () {
    let badgeList = []
    this.props.requests.forEach((data) => {
      badgeList.push(
        <RequestCard
          navigation={this.props.navigation}
          key={data._id}
          user={data.user.username}
          title={data.title}
          location={data.location}
          tags={data.tags}
          game={data.game.name}
          requestId={data._id}
        />
      )
    })

    return (
      <View>
        {badgeList}
      </View>
    )
  }
}
