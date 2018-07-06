import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import get from 'lodash.get'
import map from 'lodash.map'
import zipObject from 'lodash.zipobject'
import Main from './Main'
import filterTrain from './filterTrain'

const styles = StyleSheet.create({
  box: { padding: 10 },
  error: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      station: [],
      train: [],
      stations: {},
      statusText: 'OK',
    }
    this.fetchStations()
    this.fetchStation('Sst')
  }

  render() {
    const { station, train, stations, statusText } = this.state
    const noData = !station.length && !train.id
    return (
      <View style={styles.box}>
        {!noData && (
          <Main
            station={station}
            train={train}
            stations={stations}
            fetchTrain={trainIdent => this.fetchTrain(trainIdent)}
            fetchStation={location => this.fetchStation(location)}
          />
        )}
        {statusText === 'OK' || <Text style={styles.error}>{statusText}</Text>}
        {noData && (
          <Button onPress={() => this.fetchStation('Sst')} title="Sst" />
        )}
      </View>
    )
  }

  async fetchStations() {
    const response = await fetch('/json/pendel')

    this.setState({ statusText: response.statusText })

    if (response.status === 200) {
      const json = await response.json()
      const signatures = map(json, 'LocationSignature')
      const names = map(json, 'AdvertisedShortLocationName')
      this.setState({
        stations: zipObject(signatures, names),
      })
    }
  }

  async fetchStation(locationSignature) {
    const response = await fetch(
      `/json/departures?locations=${locationSignature}&since=0:10&until=0:50`
    )

    this.setState({ statusText: response.statusText })

    if (response.status === 200) {
      const json = await response.json()

      this.setState({
        station: get(json, 'RESPONSE.RESULT[0].TrainAnnouncement'),
        train: [],
      })
    }
  }

  async fetchTrain(advertisedTrainIdent) {
    const response = await fetch(`/json/train/${advertisedTrainIdent}`)
    const json = await response.json()

    this.setState({
      station: [],
      train: filterTrain(get(json, 'RESPONSE.RESULT[0].TrainAnnouncement')),
    })
  }
}
