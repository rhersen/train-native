import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  text: { fontWeight: 'bold', fontSize: 28, fontFamily: 'monospace' },
})

export default class Trains extends Component {
  render() {
    const { station = [], train = [], fetchStation, fetchTrain } = this.props

    return (
      <View>
        <Text style={styles.text}>
          {station.length
            ? station[0].LocationSignature
            : train.length
              ? train[0].AdvertisedTrainIdent
              : ''}
        </Text>
        <View>
          {station.map(announcement => (
            <Text
              key={announcement.AdvertisedTrainIdent}
              onPress={() => fetchTrain(announcement.AdvertisedTrainIdent)}
              style={styles.text}
            >
              {getStationText(announcement)}
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
              {getTrainText(a)}
            </Text>
          ))}
        </View>
      </View>
    )
  }
}

function getStationText(a) {
  return [train(a), toLocation(a), time(a)].join('')
}

function getTrainText(a) {
  return [station(a), time(a)].join(' ')
}

function train(a) {
  const s = a.AdvertisedTrainIdent
  return s.length === 5 ? s : `${s} `
}

function toLocation(a) {
  const s = `${a.ToLocation.map(l => l.LocationName)}   `
  return s.substr(0, 4)
}

function time(a) {
  return (
    a.AdvertisedTimeAtLocation.substr(11, 5) +
    (a.EstimatedTimeAtLocation
      ? a.EstimatedTimeAtLocation.substr(13, 3)
      : '   ') +
    (a.TimeAtLocation ? a.TimeAtLocation.substr(13, 3) : '   ')
  )
}

function station(a) {
  const s = `${a.LocationSignature}   `
  return s.substr(0, 4)
}
