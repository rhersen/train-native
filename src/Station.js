import React, { Component } from 'react'
import {
  Animated,
  Easing,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { countdown, toLocation, trainTime } from './util'

const styles = StyleSheet.create({
  northbound: { backgroundColor: '#fdd' },
  southbound: { backgroundColor: 'lightblue' },
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
    const { station = {}, sl = {}, fetchTrain, pstyles } = this.props
    return (
      <Animated.View style={{ opacity }}>
        <FlatList
          data={station.trains}
          extraData={now}
          renderItem={({ item }) => {
            const expected = sl[item.id] && sl[item.id].ExpectedDateTime
            return (
              <View
                style={[
                  pstyles.row,
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
                  style={pstyles.destination}
                >
                  {this.getTrainDestination(item)}
                </Text>
                <Text
                  style={[
                    pstyles.time,
                    item.actual && pstyles.actual,
                    item.estimated && pstyles.estimated,
                  ]}
                >
                  {trainTime(item, expected)}
                </Text>
                <Text
                  style={[
                    pstyles.time,
                    item.actual && pstyles.actual,
                    item.estimated && pstyles.estimated,
                  ]}
                >
                  {countdown(item, expected, now)}
                </Text>
              </View>
            )
          }}
        />
      </Animated.View>
    )
  }
  getTrainDestination(a) {
    const { stations } = this.props

    return toLocation(a, stations)
  }
}
