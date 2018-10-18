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
import { stationName, time } from './util'

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
            <View style={[styles.row, getStyle(item)]}>
              <Text
                onPress={() => {
                  Animated.timing(this.state.opacity, {
                    toValue: 0.3,
                    duration: 1000,
                    easing: Easing.out(Easing.cubic),
                  }).start()
                  fetchStation(item.location)
                }}
                style={styles.destination}
              >
                {this.location(item)}
              </Text>
              <Text style={styles.time}>
                {item.Avgang &&
                  item.Avgang.advertised &&
                  item.Avgang.advertised.substr(11, 5)}
              </Text>
              <Text
                style={[
                  styles.time,
                  item.Avgang && item.Avgang.actual && styles.actual,
                  item.Avgang && item.Avgang.estimated && styles.estimated,
                ]}
              >
                {time(item.Avgang || {})}
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

function getStyle(a) {
  const avgang = a.Avgang || {}
  if (!avgang.actual) {
    return styles.southbound
  }

  const diff = difference_in_minutes(avgang.actual, avgang.advertised)
  if (diff < 0) return styles.ahead
  if (diff < 1) return styles.ontime
  if (diff < 2) return styles.delay1
  if (diff < 4) return styles.delay2
  if (diff < 8) return styles.delay4
  return styles.delay8
}
