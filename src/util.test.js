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
    const stations = getStations()
    expect(toLocation({ to: 'Upv' }, stations)).toBe('Väsby')
    expect(toLocation({ to: 'Vhe' }, stations)).toBe('V-haninge')
    expect(toLocation({ to: 'Sod' }, stations)).toBe('Odenplan')
    expect(toLocation({ to: 'Sci' }, stations)).toBe('City')
    expect(toLocation({ to: 'Sst' }, stations)).toBe('Södra')
    expect(toLocation({ to: 'Söd' }, stations)).toBe('Södertälje H')
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

function getStations() {
  return {
    Arnc: 'Arlanda',
    Bkb: 'Barkarby',
    Bro: 'Bro',
    Fas: 'Farsta strand',
    Flb: 'Flemingsberg',
    Gdv: 'Gröndalsviken',
    Hgv: 'Häggvik',
    Hfa: 'Hemfosa',
    Hel: 'Helenelund',
    Hu: 'Huddinge',
    Hnd: 'Handen',
    Jkb: 'Jakobsberg',
    Jn: 'Järna',
    Jbo: 'Jordbro',
    Kda: 'Krigslida',
    Kän: 'Kungsängen',
    Khä: 'Kallhäll',
    Mr: 'Märsta',
    Ngd: 'Nynäsgård',
    Nvk: 'Norrviken',
    Mö: 'Mölnbo',
    Nyh: 'Nynäshamn',
    Rs: 'Rosersberg',
    Sci: 'Stockholm City',
    Rön: 'Rönninge',
    Sub: 'Sundbyberg',
    Spå: 'Spånga',
    Skg: 'Skogås',
    Ts: 'Tungelsta',
    Söu: 'Södertälje Syd',
    Tåd: 'Trångsund',
    Sst: 'Stockholms södra',
    Tu: 'Tumba',
    Tul: 'Tullinge',
    Ssä: 'Segersäng',
    Sta: 'Stuvsta',
    Udl: 'Ulriksdal',
    Vhe: 'Västerhaninge',
    Upv: 'Upplands Väsby',
    Åbe: 'Årstaberg',
    Äs: 'Älvsjö',
    Öso: 'Ösmo',
    Öte: 'Östertälje',
    So: 'Solna',
    Sod: 'Sthlm Odenplan',
    Sol: 'Sollentuna',
    R: 'Rotebro',
    Söc: 'Södertälje C',
    Söd: 'Södertälje hamn',
    Bål: 'Bålsta',
    Kn: 'Knivsta',
    U: 'Uppsala',
    Gn: 'Gnesta',
  }
}
