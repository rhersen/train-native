import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import get from 'lodash.get'
import keyby from 'lodash.keyby'
import Main from './Main'
import * as filter from './filter'

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
      station: {},
      sl: {},
      train: [],
      stations: {},
      statusText: 'OK',
    }
    this.fetchStations()
    this.fetchStation('Cst')
  }

  render() {
    const { station, sl, train, stations, statusText } = this.state
    const noData = !station.location && !train.id
    return (
      <View style={styles.box}>
        {!noData && (
          <Main
            station={station}
            sl={sl}
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
    const response = await fetch('/json/stations')

    this.setState({ statusText: response.statusText })

    if (response.status === 200) {
      this.setState({
        stations: keyby(
          get(await response.json(), 'RESPONSE.RESULT[0].TrainStation'),
          'LocationSignature'
        ),
      })
    }
  }

  async fetchStation(locationSignature) {
    const departuresResponse = await fetch(
      `/json/departures?locations=${locationSignature}&since=3:00&until=3:00&type=sj%20intercity`
    )

    this.setState({ statusText: departuresResponse.statusText })

    if (departuresResponse.status === 200) {
      const station = filter.station(
        get(
          await departuresResponse.json(),
          'RESPONSE.RESULT[0].TrainAnnouncement'
        )
      )

      this.setState({ station, train: {} })

      const site = this.state.stations[locationSignature]
      if (site && site.siteId) {
        const slResponse = await fetch(`/json/sl?locations=${site.siteId}`)
        this.setState({
          sl: keyby(
            (await slResponse.json()).ResponseData.Trains,
            'JourneyNumber'
          ),
        })
      }
    }
  }

  async fetchTrain(advertisedTrainIdent) {
    const response = await fetch(`/json/train/${advertisedTrainIdent}`)
    const json = await response.json()

    this.setState({
      station: {},
      sl: {},
      train: filter.train(get(json, 'RESPONSE.RESULT[0].TrainAnnouncement')),
    })
  }
}
