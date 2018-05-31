import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  text: { fontWeight: 'bold', fontSize: 20, fontFamily: 'monospace' },
})

export default class Trains extends Component {
  render() {
    const {
      station = [],
      train = [],
      stations = {},
      fetchStation,
      fetchTrain,
    } = this.props

    return (
      <View>
        <Text style={styles.text}>
          {station.length
            ? stationName(station[0].LocationSignature)
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

    function getStationText(a) {
      function train(a) {
        const s = a.AdvertisedTrainIdent
        if (s) {
          return `${s}     `.substr(0, 5)
        }
      }

      return [train(a), toLocation(a), time(a)].join('')
    }

    function toLocation(a) {
      if (a.ToLocation) {
        const s = `${a.ToLocation.map(l => stationName(l.LocationName))}   `
        return `${s}     `.substr(0, 11)
      }
    }

    function getTrainText(a) {
      return [activity(a), location(a), time(a)].join(' ')
    }

    function activity(a) {
      const s = a.ActivityType
      if (s) {
        return `${s}     `.substr(0, 3)
      }
    }

    function location(a) {
      const name = stationName(a.LocationSignature)
      return name && `${name}         `.substr(0, 12)
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

    function stationName(locationSignature) {
      return stations[locationSignature] || locationSignature
    }
  }
}
