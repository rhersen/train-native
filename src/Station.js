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
    const { station = {}, fetchTrain, style } = this.props
    return (
      <Animated.View style={{ opacity }}>
        {station.trains.map(a => (
          <Text
            key={a.id ? a.id : 0}
            onPress={() => {
              Animated.timing(this.state.opacity, {
                toValue: 0.3,
                duration: 1000,
                easing: Easing.out(Easing.cubic),
              }).start()
              return fetchTrain(a.id)
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
    const { stations } = this.props

    return [trainId(), toLocation(a, stations), time(a)].join('')

    function trainId() {
      const s = a.id
      if (s) {
        return `${s}     `.substr(0, 5)
      }
    }
  }
}
