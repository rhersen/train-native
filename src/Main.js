import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Station from './Station'
import { stationName } from './util'
import Train from './Train'

const styles = StyleSheet.create({
  heading: { fontWeight: 'bold', fontSize: 44, textAlign: 'center' },
  actual: { fontWeight: 'bold', fontSize: 21 },
  estimated: { fontStyle: 'italic' },
  destination: { fontSize: 28, flexGrow: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  time: {
    fontFamily: '"Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
    fontSize: 22,
    flexGrow: 0,
    textAlign: 'right',
    width: '22%',
  },
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
            pstyles={styles}
          />
        )}
        {Boolean(train.id) && (
          <Train
            train={train}
            stations={stations}
            fetchStation={fetchStation}
            pstyles={styles}
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

    return key && stations[key] && stations[key].AdvertisedShortLocationName
  }
}
