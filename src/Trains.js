import React, { Component } from 'react'
import { Animated, Text } from 'react-native'
import { activity, stationName, time, toLocation } from './util'

export default class Trains extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 500 }).start()
  }

  render() {
    const { opacity } = this.state
    const { train = [], fetchStation, style } = this.props
    return (
      <Animated.View style={{ opacity }}>
        {train.map(a => (
          <Text
            key={a.LocationSignature + a.ActivityType}
            onPress={() => fetchStation(a.LocationSignature)}
            style={style}
          >
            {this.getTrainText(a)}
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

  getTrainText(a) {
    return [activity(a), this.location(a), time(a)].join(' ')
  }

  location(a) {
    const name = stationName(a.LocationSignature, this.props.stations)
    return name && `${name}         `.substr(0, 12)
  }
}
