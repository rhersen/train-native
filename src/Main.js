import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Stations from './Stations'
import { stationName, toLocation, activity, time } from './util'

const styles = StyleSheet.create({
  text: { fontWeight: 'bold', fontSize: 20, fontFamily: 'monospace' },
})

export default class Main extends Component {
  render() {
    const {
      station = [],
      stations,
      train = [],
      fetchStation,
      fetchTrain,
    } = this.props

    return (
      <View style={this.props.style}>
        <Text style={styles.text}>
          {station.length
            ? stationName(station[0].LocationSignature, stations)
            : train.length
              ? `Tåg ${train[0].AdvertisedTrainIdent} mot ${toLocation(
                  train[0],
                  stations
                )}`
              : ''}
        </Text>
        {Boolean(station.length) && (
          <Stations
            station={station}
            stations={stations}
            fetchTrain={fetchTrain}
            style={styles.text}
          />
        )}
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
      </View>
    )
  }

  getTrainText(a) {
    return [activity(a), this.location(a), time(a)].join(' ')
  }

  location(a) {
    const name = stationName(a.LocationSignature, this.props.stations)
    return name && `${name}         `.substr(0, 12)
  }
}
