import React, { Component } from 'react'
import { Animated, Easing, Text } from 'react-native'
import { activity, stationName, time } from './util'

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
            onPress={() => {
              Animated.timing(this.state.opacity, {
                toValue: 0.3,
                duration: 1000,
                easing: Easing.out(Easing.cubic),
              }).start()
              fetchStation(a.LocationSignature)
            }}
            style={style}
          >
            {this.getTrainText(a)}
          </Text>
        ))}
      </Animated.View>
    )
  }

  getTrainText(a) {
    return [activity(a), this.location(a), time(a)].join(' ')
  }

  location(a) {
    const name = stationName(a.LocationSignature, this.props.stations)
    return name && `${name}           `.substr(0, 12)
  }
}
