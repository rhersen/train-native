import React, { Component } from 'react'
import { Animated, Easing, Text } from 'react-native'
import { time, toLocation } from './util'

export default class Station extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 500 }).start()
  }

  render() {
    const { opacity } = this.state
    const { station = [], fetchTrain, style } = this.props
    return (
      <Animated.View style={{ opacity }}>
        {station.map(a => (
          <Text
            key={a.AdvertisedTrainIdent ? a.AdvertisedTrainIdent : 0}
            onPress={() => {
              Animated.timing(this.state.opacity, {
                toValue: 0.3,
                duration: 1000,
                easing: Easing.out(Easing.cubic),
              }).start()
              return fetchTrain(a.AdvertisedTrainIdent)
            }}
            style={style}
          >
            {this.getStationText(a)}
          </Text>
        ))}
      </Animated.View>
    )
  }

  getStationText(a) {
    const { stations } = this.props

    return [train(), toLocation(a, stations), time(a)].join('')

    function train() {
      const s = a.AdvertisedTrainIdent
      if (s) {
        return `${s}     `.substr(0, 5)
      }
    }
  }
}
