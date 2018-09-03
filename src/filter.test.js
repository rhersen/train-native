import * as filter from './filter'
/*
(1 'ActivityType')
1 'LocationSignature'

(2 'ProductInformation')
12 'AdvertisedTrainIdent'
5 'ToLocation'
2 'TrackAtLocation'
12 'AdvertisedTimeAtLocation'
4 'TimeAtLocation'
(3 'ViaToLocation')
(12 'ModifiedTime')
*/

describe('train', () => {
  it('empty', () => expect(filter.train()).toEqual({}))
  it('empty array', () => expect(filter.train([])).toEqual({}))

  it('one departure', () =>
    expect(
      filter.train([
        {
          ActivityType: 'Avgang',
          AdvertisedTimeAtLocation: '2018-06-27T06:40:00',
          EstimatedTimeAtLocation: '2018-06-27T06:40:00',
          AdvertisedTrainIdent: '2814',
          LocationSignature: 'Nyh',
          ModifiedTime: '2018-06-27T04:40:31.416Z',
          ProductInformation: ['Pendeltåg', '43'],
          TimeAtLocation: '2018-06-27T06:40:00',
          ToLocation: [{ LocationName: 'Bål', Priority: 1, Order: 0 }],
          TrackAtLocation: '1',
          ViaToLocation: [{ LocationName: 'Sci', Priority: 1, Order: 0 }],
        },
      ])
    ).toEqual({
      id: '2814',
      to: 'Bål',
      locations: [
        {
          location: 'Nyh',
          activity: 'Avgang',
          key: 'NyhAvgang',
          advertised: '2018-06-27T06:40:00',
          estimated: '2018-06-27T06:40:00',
          actual: '2018-06-27T06:40:00',
        },
      ],
    }))
})

describe('station', () => {
  it('empty', () => expect(filter.station()).toEqual({}))
  it('empty array', () => expect(filter.station([])).toEqual({}))

  it('one departure', () =>
    expect(
      filter.station([
        {
          ActivityType: 'Avgang',
          AdvertisedTimeAtLocation: '2018-06-27T06:40:00',
          EstimatedTimeAtLocation: '2018-06-27T06:40:00',
          AdvertisedTrainIdent: '2814',
          LocationSignature: 'Nyh',
          ModifiedTime: '2018-06-27T04:40:31.416Z',
          ProductInformation: ['Pendeltåg', '43'],
          TimeAtLocation: '2018-06-27T06:40:00',
          ToLocation: [{ LocationName: 'Bål', Priority: 1, Order: 0 }],
          TrackAtLocation: '1',
          ViaToLocation: [{ LocationName: 'Sci', Priority: 1, Order: 0 }],
        },
      ])
    ).toEqual({
      location: 'Nyh',
      trains: [
        {
          id: '2814',
          key: '2814',
          to: 'Bål',
          activity: 'Avgang',
          advertised: '2018-06-27T06:40:00',
          estimated: '2018-06-27T06:40:00',
          actual: '2018-06-27T06:40:00',
        },
      ],
    }))
})
