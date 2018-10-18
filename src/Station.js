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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  northbound: { backgroundColor: '#fdd' },
  southbound: { backgroundColor: 'lightblue' },
  time: {
    fontFamily: '"Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
    fontSize: 22,
    flexGrow: 0,
    textAlign: 'right',
    width: '22%',
  },
  actual: { fontWeight: 'bold', fontSize: 21 },
  estimated: { fontStyle: 'italic' },
  destination: { fontSize: 28, flexGrow: 1 },
})

export default class Station extends Component {
  state = {
    opacity: new Animated.Value(0),
    now: new Date(),
  }

  tick() {
    this.setState(() => ({ now: new Date() }))
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 500 }).start()
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { opacity, now } = this.state
    const { station = {}, fetchTrain } = this.props
    return (
      <Animated.View style={{ opacity }}>
        <FlatList
          data={station.trains}
          extraData={now}
          renderItem={({ item }) => (
            <View
              style={[
                styles.row,
                /[02468]$/.test(item.id)
                  ? styles.northbound
                  : styles.southbound,
              ]}
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
                style={styles.destination}
              >
                {this.getTrainDestination(item)}
              </Text>
              <Text
                style={[
                  styles.time,
                  item.actual && styles.actual,
                  item.estimated && styles.estimated,
                ]}
              >
                {time(item)}
              </Text>
              <Text
                style={[
                  styles.time,
                  item.actual && styles.actual,
                  item.estimated && styles.estimated,
                ]}
              >
                {countdown(item, now)}
              </Text>
            </View>
          )}
        />
      </Animated.View>
    )
  }
  getTrainDestination(a) {
    const { stations } = this.props

    return toLocation(a, stations)
  }
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
