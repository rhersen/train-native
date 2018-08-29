import React, { Component } from 'react'
import { Animated, Easing, StyleSheet, Text } from 'react-native'
import difference_in_minutes from 'date-fns/difference_in_minutes'
import { activity, stationName, time } from './util'

const styles = StyleSheet.create({
  ahead: { backgroundColor: 'cyan' },
  ontime: { backgroundColor: 'lightgreen' },
  delayed: { backgroundColor: 'pink' },
})

export default class Train extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 500 }).start()
  }

  render() {
    const { opacity } = this.state
    const { train = {}, fetchStation } = this.props
    return (
      <Animated.View style={{ opacity }}>
        {train.locations.map(a => (
          <Text
            key={a.location + a.activity}
            onPress={() => {
              Animated.timing(this.state.opacity, {
                toValue: 0.3,
                duration: 1000,
                easing: Easing.out(Easing.cubic),
              }).start()
              fetchStation(a.location)
            }}
            style={this.getStyle(a)}
          >
            {this.getTrainText(a)}
          </Text>
        ))}
      </Animated.View>
    )
  }

  getStyle(a) {
    const { style } = this.props

    if (!a.actual) {
      return [style]
    }

    const diff = difference_in_minutes(a.actual, a.advertised)
    if (diff < 0) return [style, styles.ahead]
    if (diff > 0) return [style, styles.delayed]
    return [style, styles.ontime]
  }

  getTrainText(a) {
    return [activity(a), this.location(a), time(a)].join(' ')
  }

  location(a) {
    const name = stationName(a.location, this.props.stations)
    return name && `${name}           `.substr(0, 12)
  }
}
