import filterTrain from './filterTrain'
/*
1 'AdvertisedTrainIdent'
1 'Deviation'
1 'ProductInformation'
1 'ToLocation'
(3 'ViaToLocation')

16 'LocationSignature'
5 'TrackAtLocation'
2 'ActivityType'

17 'AdvertisedTimeAtLocation'
23 'TimeAtLocation'
25 'EstimatedTimeAtLocation'
(28 'ModifiedTime')
*/

describe('filterTrain', () => {
  it('empty', () => expect(filterTrain()).toEqual({}))
  it('empty array', () => expect(filterTrain([])).toEqual({}))

  it('one departure', () =>
    expect(
      filterTrain([
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
      AdvertisedTrainIdent: '2814',
      ToLocation: 'Bål',
      Locations: [
        {
          LocationSignature: 'Nyh',
          ActivityType: 'Avgang',
          AdvertisedTimeAtLocation: '2018-06-27T06:40:00',
          EstimatedTimeAtLocation: '2018-06-27T06:40:00',
          TimeAtLocation: '2018-06-27T06:40:00',
        },
      ],
    }))
})
