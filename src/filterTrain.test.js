import filterTrain from './filterTrain'

describe('filterTrain', () => {
  it('empty', () => expect(filterTrain()).toEqual([]))
  it('empty array', () => expect(filterTrain([])).toEqual([]))

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
    ).toEqual([
      {
        ActivityType: 'Avgang',
        AdvertisedTimeAtLocation: '2018-06-27T06:40:00',
        EstimatedTimeAtLocation: '2018-06-27T06:40:00',
        AdvertisedTrainIdent: '2814',
        LocationSignature: 'Nyh',
        TimeAtLocation: '2018-06-27T06:40:00',
        ToLocation: 'Bål',
      },
    ]))

  it('identical arrival and departure', () =>
    expect(
      filterTrain([
        {
          ActivityType: 'Ankomst',
          AdvertisedTimeAtLocation: '2018-07-02T08:18:00',
          AdvertisedTrainIdent: '2818',
          LocationSignature: 'Hnd',
          ModifiedTime: '2018-07-01T23:14:43.36Z',
          ProductInformation: ['Pendeltåg', '43'],
          ToLocation: [{ LocationName: 'Bål', Priority: 1, Order: 0 }],
          TrackAtLocation: '2',
          ViaToLocation: [{ LocationName: 'Sci', Priority: 1, Order: 0 }],
        },
        {
          ActivityType: 'Avgang',
          AdvertisedTimeAtLocation: '2018-07-02T08:18:00',
          AdvertisedTrainIdent: '2818',
          LocationSignature: 'Hnd',
          ModifiedTime: '2018-07-01T23:14:41.579Z',
          ProductInformation: ['Pendeltåg', '43'],
          ToLocation: [{ LocationName: 'Bål', Priority: 1, Order: 0 }],
          TrackAtLocation: '2',
          ViaToLocation: [{ LocationName: 'Sci', Priority: 1, Order: 0 }],
        },
      ])
    ).toEqual([
      {
        ActivityType: 'Ankomst',
        AdvertisedTimeAtLocation: '2018-07-02T08:18:00',
        AdvertisedTrainIdent: '2818',
        LocationSignature: 'Hnd',
        ToLocation: 'Bål',
      },
      {
        ActivityType: 'Avgang',
        AdvertisedTimeAtLocation: '2018-07-02T08:18:00',
        AdvertisedTrainIdent: '2818',
        LocationSignature: 'Hnd',
        ToLocation: 'Bål',
      },
    ]))
})
