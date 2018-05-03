import React, { Component } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import Trains from './Trains'

const styles = StyleSheet.create({
  box: { padding: 10 },
})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      station: [],
      train: [],
    }
  }

  render() {
    const { station, train } = this.state
    return (
      <View style={styles.box}>
        <Trains
          station={station}
          train={train}
          fetchTrain={trainIdent => this.fetchTrain(trainIdent)}
          fetchStation={location => this.fetchStation(location)}
        />
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
    const json = await response.json()

    this.setState({
      station: json.RESPONSE.RESULT[0].TrainAnnouncement,
      train: [],
    })
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
