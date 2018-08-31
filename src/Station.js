import React, { Component } from 'react'
import { Animated, Easing, FlatList, StyleSheet, Text } from 'react-native'
import { time, toLocation } from './util'

const styles = StyleSheet.create({
  actual: { backgroundColor: 'lightgreen' },
  estimated: { backgroundColor: 'yellow' },
})

export default class Station extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 500 }).start()
  }

  render() {
    const { opacity } = this.state
    const { station = {}, fetchTrain } = this.props
    return (
      <Animated.View style={{ opacity }}>
        <FlatList
          data={station.trains}
          renderItem={({ item }) => (
            <Text
              key={item.id ? item.id : 0}
              onPress={() => {
                Animated.timing(this.state.opacity, {
                  toValue: 0.3,
                  duration: 1000,
                  easing: Easing.out(Easing.cubic),
                }).start()
                return fetchTrain(item.id)
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
    if (a.actual) return [style, styles.actual]
    if (a.estimated) return [style, styles.estimated]
    return [style]
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
