import { activity, countdown, time, toLocation } from './util'

describe('activity', () => {
  it('empty', () => expect(activity({})).toBe('   '))

  it('returns the 3 first characters', () =>
    expect(activity({ ActivityType: 'Avgang' })).toBe('Avg'))
})

describe('toLocation', () => {
  it('empty object', () => expect(toLocation({})).toBeUndefined())

  it('location without stations', () =>
    expect(toLocation({ to: 'Tul' })).toBe('Tul'))

  it('location with stations', () =>
    expect(toLocation({ to: 'Tul' }, { Tul: 'Tullinge' })).toBe('Tullinge'))

  it('abbreviates names longer than "Södertälje C"', () => {
    const stations = { Upv: 'Upplands Väsby', Vhe: 'Västerhaninge' }
    expect(toLocation({ to: 'Upv' }, stations)).toBe('Väsby')
    expect(toLocation({ to: 'Vhe' }, stations)).toBe('V-haninge')
  })
})

describe('time', () => {
  it('empty', () => expect(time({})).toBeUndefined())

  it('advertised', () =>
    expect(
      time({
        advertised: '2018-05-04T17:30:00',
      })
    ).toBeUndefined())

  it('estimated', () =>
    expect(
      time({
        advertised: '2018-05-04T17:30:00',
        estimated: '2018-05-04T17:31:00',
      })
    ).toBe('31'))

  it('actual', () =>
    expect(
      time({
        advertised: '2018-05-04T17:30:00',
        actual: '2018-05-04T17:30:00',
      })
    ).toBe('30'))
})

describe('countdown', () => {
  it('empty', () => expect(countdown()).toBeFalsy())

  it('shows nothing if train has passed', () =>
    expect(
      countdown({ advertised: '2018-05-04T17:29:00' }, '2018-05-04T17:31:00')
    ).toBe(''))

  it('diffs against advertised', () =>
    expect(
      countdown({ advertised: '2018-05-04T17:41:00' }, '2018-05-04T17:30:00')
    ).toBe('11min'))

  it('diffs against estimated', () =>
    expect(
      countdown(
        { advertised: '2018-05-04T17:41:00', estimated: '2018-05-04T17:45:00' },
        '2018-05-04T17:30:00'
      )
    ).toBe('15min'))

  it('shows seconds if less than 10 minutes', () =>
    expect(
      countdown({ advertised: '2018-05-04T17:39:00' }, '2018-05-04T17:30:27')
    ).toBe('8:33'))

  it('shows only seconds if less than 100 seconds', () =>
    expect(
      countdown({ advertised: '2018-05-04T17:39:00' }, '2018-05-04T17:37:21')
    ).toBe('99s'))

  it('shows negative seconds up to 99', () =>
    expect(
      countdown({ advertised: '2018-05-04T17:38:00' }, '2018-05-04T17:39:21')
    ).toBe('-81s'))

  it('pads seconds with zeroes', () =>
    expect(
      countdown({ advertised: '2018-05-04T17:37:00' }, '2018-05-04T17:33:51')
    ).toBe('3:09'))
})
