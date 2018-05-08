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
              key={
                announcement.AdvertisedTrainIdent
                  ? announcement.AdvertisedTrainIdent
                  : 0
              }
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
  return [activity(a), station(a), time(a)].join('')
}

function train(a) {
  const s = a.AdvertisedTrainIdent
  if (s) {
    return `${s}     `.substr(0, 5)
  }
}

function toLocation(a) {
  if (a.ToLocation) {
    const s = `${a.ToLocation.map(l => l.LocationName)}   `
    return s.substr(0, 4)
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

function activity(a) {
  const s = a.ActivityType
  if (s) {
    return `${s.substr(0, 3)} `
  }
}

function station(a) {
  const s = a.LocationSignature
  if (s) {
    return `${s}     `.substr(0, 5)
  }
}
