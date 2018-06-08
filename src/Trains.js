import React, { Component } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  text: { fontWeight: 'bold', fontSize: 20, fontFamily: 'monospace' },
})

export default class Trains extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 500 }).start()
  }

  render() {
    const { opacity } = this.state
    const { station = [], train = [], fetchStation, fetchTrain } = this.props

    return (
      <Animated.View style={{ ...this.props.style, opacity }}>
        <Text style={styles.text}>
          {station.length
            ? this.stationName(station[0].LocationSignature)
            : train.length
              ? `Tåg ${train[0].AdvertisedTrainIdent} mot ${this.toLocation(
                  train[0]
                )}`
              : ''}
        </Text>
        <View>
          {station.map(announcement => (
            <Text
              key={
                announcement.AdvertisedTrainIdent
                  ? announcement.AdvertisedTrainIdent
                  : 0
              }
              onPress={() => fetchTrain(announcement.AdvertisedTrainIdent)}
              style={styles.text}
            >
              {this.getStationText(announcement)}
            </Text>
          ))}
        </View>
        <View>
          {train.map(a => (
            <Text
              key={a.LocationSignature + a.ActivityType}
              onPress={() => fetchStation(a.LocationSignature)}
              style={styles.text}
            >
              {this.getTrainText(a)}
            </Text>
          ))}
        </View>
      </Animated.View>
    )
  }

  getStationText(a) {
    function train() {
      const s = a.AdvertisedTrainIdent
      if (s) {
        return `${a.AdvertisedTrainIdent}     `.substr(0, 5)
      }
    }

    return [train(), this.toLocation(a), time(a)].join('')
  }

  toLocation(a) {
    if (a.ToLocation) {
      const s = `${a.ToLocation.map(l => this.stationName(l.LocationName))}   `
      return `${s}     `.substr(0, 11)
    }
  }

  stationName(locationSignature) {
    return this.props.stations[locationSignature] || locationSignature
  }

  getTrainText(a) {
    return [activity(a), this.location(a), time(a)].join(' ')
  }

  location(a) {
    const name = this.stationName(a.LocationSignature)
    return name && `${name}         `.substr(0, 12)
  }
}

function activity(a) {
  const s = a.ActivityType
  if (s) {
    return `${s}     `.substr(0, 3)
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
}

function minute(t) {
  return t ? t.substr(13, 3) : '   '
}
