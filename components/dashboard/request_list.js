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
          user={data.user}
          title={data.title}
          location={data.location}
          tags={data.tags}
          game={data.game}
          requestId={data._id}
          currentPlayers={data.currentPlayers}
          maxPlayers={data.maxPlayers}
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
