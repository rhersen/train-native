import React, { Component } from 'react'
import { Animated, Text } from 'react-native'
import { time, toLocation } from './util'

export default class Stations extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 500 }).start()
  }

  render() {
    const { opacity } = this.state
    const { station = [], stations, fetchTrain, style } = this.props
    return (
      <Animated.View style={{ opacity }}>
        {station.map(announcement => (
          <Text
            key={
              announcement.AdvertisedTrainIdent
                ? announcement.AdvertisedTrainIdent
                : 0
            }
            onPress={() => fetchTrain(announcement.AdvertisedTrainIdent)}
            style={style}
          >
            {this.getStationText(announcement, stations)}
          </Text>
        ))}
      </Animated.View>
    )
  }

  getStationText(a) {
    function train() {
      const s = a.AdvertisedTrainIdent
      if (s) {
        return `${a.AdvertisedTrainIdent}     `.substr(0, 5)
      }
    }

    return [train(), toLocation(a, this.props.stations), time(a)].join('')
  }
}
