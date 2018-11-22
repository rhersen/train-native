import { activity, countdown, minute, toLocation, trainTime } from './util'

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
    expect(
      toLocation({ to: 'Tul' }, { Tul: { AdvertisedLocationName: 'Tullinge' } })
    ).toBe('Tullinge'))

  it('abbreviates names longer than "Södertälje C"', () => {
    const stations = getStations()
    expect(toLocation({ to: 'Upv' }, stations)).toBe('Väsby')
    expect(toLocation({ to: 'Vhe' }, stations)).toBe('V-haninge')
    expect(toLocation({ to: 'Sod' }, stations)).toBe('Odenplan')
    expect(toLocation({ to: 'Sci' }, stations)).toBe('City')
    expect(toLocation({ to: 'Sst' }, stations)).toBe('Södra')
    expect(toLocation({ to: 'Shd' }, stations)).toBe('Södertälje H')
  })
})

describe('time', () => {
  it('empty', () => expect(minute({})).toBeUndefined())

  it('advertised', () =>
    expect(
      minute({
        advertised: '2018-05-04T17:30:00',
      })
    ).toBeUndefined())

  it('estimated', () =>
    expect(
      minute({
        advertised: '2018-05-04T17:30:00',
        estimated: '2018-05-04T17:31:00',
      })
    ).toBe('31'))

  it('actual', () =>
    expect(
      minute({
        advertised: '2018-05-04T17:30:00',
        actual: '2018-05-04T17:30:00',
      })
    ).toBe('30'))
})

describe('countdown', () => {
  it('empty', () => expect(countdown()).toBeFalsy())

  it('shows nothing if train has passed', () =>
    expect(
      countdown(
        { advertised: '2018-05-04T17:29:00' },
        undefined,
        '2018-05-04T17:31:00'
      )
    ).toBe(''))

  it('diffs against advertised', () =>
    expect(
      countdown(
        { advertised: '2018-05-04T17:41:00' },
        undefined,
        '2018-05-04T17:30:00'
      )
    ).toBe('11min'))

  it('diffs against estimated', () =>
    expect(
      countdown(
        { advertised: '2018-05-04T17:41:00', estimated: '2018-05-04T17:45:00' },
        undefined,
        '2018-05-04T17:30:00'
      )
    ).toBe('15min'))

  it('shows seconds if less than 10 minutes', () =>
    expect(
      countdown(
        { advertised: '2018-05-04T17:39:00' },
        undefined,
        '2018-05-04T17:30:27'
      )
    ).toBe('8:33'))

  it('shows only seconds if less than 100 seconds', () =>
    expect(
      countdown(
        { advertised: '2018-05-04T17:39:00' },
        undefined,
        '2018-05-04T17:37:21'
      )
    ).toBe('99s'))

  it('shows negative seconds up to 99', () =>
    expect(
      countdown(
        { advertised: '2018-05-04T17:38:00' },
        undefined,
        '2018-05-04T17:39:21'
      )
    ).toBe('-81s'))

  it('pads seconds with zeroes', () =>
    expect(
      countdown(
        { advertised: '2018-05-04T17:37:00' },
        undefined,
        '2018-05-04T17:33:51'
      )
    ).toBe('3:09'))

  it('uses estimated over advertised', () =>
    expect(
      countdown(
        { advertised: '2018-05-04T17:37:00', estimated: '2018-05-04T17:38:00' },
        undefined,
        '2018-05-04T17:33:51'
      )
    ).toBe('4:09'))

  it('uses expected over estimated', () =>
    expect(
      countdown(
        { advertised: '2018-05-04T17:37:00', estimated: '2018-05-04T17:38:00' },
        '2018-05-04T17:38:17',
        '2018-05-04T17:33:51'
      )
    ).toBe('4:26'))
})

describe('trainTime', () => {
  test('empty', () => {
    expect(trainTime({})).toBeUndefined()
  })

  test('advertised', () => {
    expect(trainTime({ advertised: '2018-05-04T17:37:00' })).toBe('17:37')
  })

  test('actual', () => {
    expect(
      trainTime({
        advertised: '2018-05-04T17:30:00',
        actual: '2018-05-04T17:37:00',
      })
    ).toBe('17:37')
  })

  test('estimated', () => {
    expect(
      trainTime({
        advertised: '2018-05-04T17:30:00',
        estimated: '2018-05-04T17:37:00',
      })
    ).toBe('17:37')
  })

  test('expected without seconds', () => {
    expect(
      trainTime(
        {
          advertised: '2018-05-04T17:30:00',
          estimated: '2018-05-04T17:37:00',
        },
        '2018-05-04T17:37:00'
      )
    ).toBe('17:37')
  })

  test('expected with seconds', () => {
    expect(
      trainTime(
        {
          advertised: '2018-05-04T17:30:00',
          estimated: '2018-05-04T17:37:00',
        },
        '2018-05-04T17:37:13'
      )
    ).toBe(':37:13')
  })
})

function getStations() {
  return {
    Arnc: stn('Arlanda'),
    Bkb: stn('Barkarby'),
    Bro: stn('Bro'),
    Fas: stn('Farsta strand'),
    Flb: stn('Flemingsberg'),
    Gdv: stn('Gröndalsviken'),
    Hgv: stn('Häggvik'),
    Hfa: stn('Hemfosa'),
    Hel: stn('Helenelund'),
    Hu: stn('Huddinge'),
    Hnd: stn('Handen'),
    Jkb: stn('Jakobsberg'),
    Jn: stn('Järna'),
    Jbo: stn('Jordbro'),
    Kda: stn('Krigslida'),
    Mr: stn('Märsta'),
    Ngd: stn('Nynäsgård'),
    Nvk: stn('Norrviken'),
    Nyh: stn('Nynäshamn'),
    Rs: stn('Rosersberg'),
    Sci: stn('Stockholm City'),
    Sub: stn('Sundbyberg'),
    Skg: stn('Skogås'),
    Ts: stn('Tungelsta'),
    Sst: stn('Stockholms södra'),
    Tu: stn('Tumba'),
    Tul: stn('Tullinge'),
    Sta: stn('Stuvsta'),
    Udl: stn('Ulriksdal'),
    Vhe: stn('Västerhaninge'),
    Upv: stn('Upplands Väsby'),
    So: stn('Solna'),
    Sod: stn('Sthlm Odenplan'),
    Sol: stn('Sollentuna'),
    R: stn('Rotebro'),
    Shd: stn('Södertälje hamn'),
    Kn: stn('Knivsta'),
    U: stn('Uppsala'),
    Gn: stn('Gnesta'),
  }
}

function stn(name) {
  return { AdvertisedLocationName: name }
}
