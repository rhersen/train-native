import React, { Component } from 'react'
import {
  Animated,
  Easing,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import difference_in_minutes from 'date-fns/difference_in_minutes'
import { stationName, minute } from './util'

const styles = StyleSheet.create({
  arrived: { fontWeight: 'bold' },
  departed: { backgroundColor: 'lightblue' },
  minute: { width: '12%' },
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
    const { train = {}, fetchStation, pstyles } = this.props
    return (
      <Animated.View style={{ opacity }}>
        <FlatList
          data={train.locations}
          renderItem={({ item }) => (
            <View style={[pstyles.row, getStyle(item)]}>
              <Text
                onPress={() => {
                  Animated.timing(this.state.opacity, {
                    toValue: 0.3,
                    duration: 1000,
                    easing: Easing.out(Easing.cubic),
                  }).start()
                  fetchStation(item.location)
                }}
                style={[pstyles.destination, isArrived(item) && styles.arrived]}
              >
                {isArrived(item) && '@'}
                {this.location(item)}
              </Text>
              <Text style={pstyles.time}>
                {item.Avgang &&
                  item.Avgang.advertised &&
                  item.Avgang.advertised.substr(11, 5)}
              </Text>
              <Text
                style={[
                  pstyles.time,
                  styles.minute,
                  item.Avgang && item.Avgang.actual && pstyles.actual,
                  item.Avgang && item.Avgang.estimated && pstyles.estimated,
                ]}
              >
                {minute(item.Avgang || {})}
              </Text>
            </View>
          )}
        />
      </Animated.View>
    )
  }

  location(a) {
    return stationName(a.location, this.props.stations)
  }
}

function isArrived(a) {
  return (!a.Avgang || !a.Avgang.actual) && a.Ankomst && a.Ankomst.actual
}

function getStyle(a) {
  const avgang = a.Avgang || {}
  if (!avgang.actual) {
    return !isArrived(a) && styles.departed
  }

  const diff = difference_in_minutes(avgang.actual, avgang.advertised)
  if (diff < 0) return styles.ahead
  if (diff < 1) return styles.ontime
  if (diff < 2) return styles.delay1
  if (diff < 4) return styles.delay2
  if (diff < 8) return styles.delay4
  return styles.delay8
}
