import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Trains from './Trains'

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
      statusText: 'OK',
    }
  }

  render() {
    const { station, train, statusText } = this.state
    return (
      <View style={styles.box}>
        <Trains
          station={station}
          train={train}
          fetchTrain={trainIdent => this.fetchTrain(trainIdent)}
          fetchStation={location => this.fetchStation(location)}
        />
        {statusText === 'OK' || <Text style={styles.error}>{statusText}</Text>}
        {!(station.length || train.length) && (
          <Button onPress={() => this.fetchStation('Sst')} title="Sst" />
        )}
      </View>
    )
  }

  async fetchStation(locationSignature) {
    const response = await fetch(
      `/json/departures?locations=${locationSignature}&since=0:10&until=0:50`
    )

    this.setState({ statusText: response.statusText })

    if (response.status === 200) {
      const json = await response.json()

      this.setState({
        station: json.RESPONSE.RESULT[0].TrainAnnouncement,
        train: [],
      })
    }
  }

  async fetchTrain(advertisedTrainIdent) {
    const response = await fetch(`/json/train/${advertisedTrainIdent}`)
    const json = await response.json()

    this.setState({
      station: [],
      train: json.RESPONSE.RESULT[0].TrainAnnouncement,
    })
  }
}
