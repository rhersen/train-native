import { activity, time, toLocation } from './util'

describe('activity', () => {
  it('empty', () => {
    expect(activity({})).toBe('   ')
  })

  it('returns the 3 first characters', () => {
    expect(activity({ ActivityType: 'Avgang' })).toBe('Avg')
  })
})

describe('toLocation', () => {
  it('empty object', () => {
    expect(toLocation({})).toBeUndefined()
  })

  it('location without stations', () => {
    expect(toLocation({ to: 'Tul' })).toBe('Tul         ')
  })

  it('location with stations', () => {
    expect(toLocation({ to: 'Tul' }, { Tul: 'Tullinge' })).toBe('Tullinge    ')
  })
})

describe('time', () => {
  it('empty', () => {
    expect(time({})).toBeUndefined()
  })

  it('advertised', () => {
    expect(time({ AdvertisedTimeAtLocation: '2018-05-04T17:30:00' })).toBe(
      '17:30      '
    )
  })

  it('estimated', () => {
    expect(
      time({
        AdvertisedTimeAtLocation: '2018-05-04T17:30:00',
        EstimatedTimeAtLocation: '2018-05-04T17:31:00',
      })
    ).toBe('17:30:31   ')
  })

  it('actual', () => {
    expect(
      time({
        AdvertisedTimeAtLocation: '2018-05-04T17:30:00',
        TimeAtLocation: '2018-05-04T17:30:00',
      })
    ).toBe('17:30   :30')
  })
})
