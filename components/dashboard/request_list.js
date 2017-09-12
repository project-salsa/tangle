import React from 'react'
import { View } from 'react-native'

import RequestCard from '../common/request_card'

export default class RequestList extends React.Component {
  render () {
    const dummyData = [
      {title: 'Test Title', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test 2', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test Title2', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test Title3', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test Title4', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test Title5', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test Title6', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test Title7', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test Title8', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test Title9', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test Title10', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test Title11', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test Title12', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test Title13', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']},
      {title: 'Test Title14', user: 'RenoMO', location: 'Rolla, MO', desc: 'some cool stuff', tags: ['League of Legends', 'In-Person']}
    ]
    let badgeList = []

    dummyData.forEach((data) => {
      badgeList.push(
        <RequestCard navigation={this.props.navigation} key={data.title} user={data.user} title={data.title} location={data.location} tags={data.tags} game={data.tags[0]} />
      )
    })

    return (
      <View>
        {badgeList}
      </View>
    )
  }
}
