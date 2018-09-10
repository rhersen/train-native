import React, { Component } from 'react'
import {
  Animated,
  Easing,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 16, flexGrow: 0, width: '16%' }}>
                {item.id}
              </Text>
              <Text
                onPress={() => {
                  Animated.timing(this.state.opacity, {
                    toValue: 0.3,
                    duration: 1000,
                    easing: Easing.out(Easing.cubic),
                  }).start()
                  return fetchTrain(item.id)
                }}
                style={{ fontSize: 28, flexGrow: 1 }}
              >
                {this.getTrainDestination(item)}
              </Text>
              <Text style={{ fontSize: 16, flexGrow: 0, width: '30%' }}>
                {time(item)}
              </Text>
            </View>
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

  getTrainDestination(a) {
    const { stations } = this.props

    return toLocation(a, stations)
  }
}
