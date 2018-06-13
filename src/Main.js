import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Stations from './Stations'
import { stationName, toLocation } from './util'
import Trains from './Trains'

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
        {Boolean(train.length) && (
          <Trains
            train={train}
            stations={stations}
            fetchStation={fetchStation}
            style={styles.text}
          />
        )}
      </View>
    )
  }
}
