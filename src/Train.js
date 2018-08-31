import React, { Component } from 'react'
import { Animated, Easing, FlatList, StyleSheet, Text } from 'react-native'
import difference_in_minutes from 'date-fns/difference_in_minutes'
import { activity, stationName, time } from './util'

const styles = StyleSheet.create({
  ahead: { backgroundColor: 'lightsteelblue' },
  ontime: { backgroundColor: 'palegreen' },
  delay1: { backgroundColor: 'lightyellow' },
  delay2: { backgroundColor: 'yellow' },
  delay4: { backgroundColor: 'orange' },
  delay8: { backgroundColor: 'red' },
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
        <FlatList
          data={train.locations}
          renderItem={({ item }) => (
            <Text
              key={item.location + item.activity}
              onPress={() => {
                Animated.timing(this.state.opacity, {
                  toValue: 0.3,
                  duration: 1000,
                  easing: Easing.out(Easing.cubic),
                }).start()
                fetchStation(item.location)
              }}
              style={this.getStyle(item)}
            >
              {this.getTrainText(item)}
            </Text>
          )}
        />
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
    if (diff < 1) return [style, styles.ontime]
    if (diff < 2) return [style, styles.delay1]
    if (diff < 4) return [style, styles.delay2]
    if (diff < 8) return [style, styles.delay4]
    return [style, styles.delay8]
  }

  getTrainText(a) {
    return [activity(a), this.location(a), time(a)].join(' ')
  }

  location(a) {
    const name = stationName(a.location, this.props.stations)
    return name && `${name}           `.substr(0, 12)
  }
}
