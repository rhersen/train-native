import React, { Component } from 'react'
import {
  Animated,
  Easing,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { countdown, minute, toLocation } from './util'

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
                ...backgroundColor(item),
              }}
            >
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
              <Text
                style={{
                  fontSize: 22,
                  flexGrow: 0,
                  width: '18%',
                  ...timeStyle(item),
                }}
              >
                {time(item)}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  flexGrow: 0,
                  width: '22%',
                  ...timeStyle(item),
                }}
              >
                {countdown(item, new Date())}
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

function backgroundColor(a) {
  if (/[02468]$/.test(a.id)) {
    return { backgroundColor: '#fdd' }
  }
  return { backgroundColor: 'lightblue' }
}

function timeStyle(a) {
  if (a.actual) return { fontWeight: 'bold' }
  if (a.estimated) return { fontStyle: 'italic' }
  return {}
}

function time(a) {
  if (a.AdvertisedTimeAtLocation) {
    return (
      a.AdvertisedTimeAtLocation.substr(11, 2) +
      minute(a.AdvertisedTimeAtLocation) +
      minute(a.EstimatedTimeAtLocation) +
      minute(a.TimeAtLocation)
    )
  }

  if (a.advertised) {
    if (a.actual) return a.actual.substr(11, 5)
    if (a.estimated) return a.estimated.substr(11, 5)
    return a.advertised.substr(11, 5)
  }
}
