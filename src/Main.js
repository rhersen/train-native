import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Station from './Station'
import { stationName } from './util'
import Train from './Train'

const styles = StyleSheet.create({
  text: { fontWeight: 'bold', fontSize: 20, fontFamily: 'monospace' },
  heading: { fontWeight: 'bold', fontSize: 44, textAlign: 'center' },
})

export default class Main extends Component {
  render() {
    const {
      station = {},
      stations,
      train = {},
      fetchStation,
      fetchTrain,
    } = this.props
    return (
      <View style={this.props.style}>
        <Text style={styles.heading}>
          {station.location
            ? stationName(station.location, stations)
            : train.id
              ? `Tåg ${train.id} mot ${this.toLocation(train, stations)}`
              : ''}
        </Text>
        {Boolean(station.location) && (
          <Station
            station={station}
            stations={stations}
            fetchTrain={fetchTrain}
            style={styles.text}
          />
        )}
        {Boolean(train.id) && (
          <Train
            train={train}
            stations={stations}
            fetchStation={fetchStation}
            style={styles.text}
          />
        )}
      </View>
    )
  }

  toLocation() {
    const {
      stations = {},
      train: { to: key },
    } = this.props

    return key ? stations[key] : key
  }
}
