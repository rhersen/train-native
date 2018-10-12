import difference_in_minutes from 'date-fns/difference_in_minutes'
import difference_in_seconds from 'date-fns/difference_in_seconds'

export function activity(a) {
  const s = a.ActivityType || a.activity || '   '
  return `${s}   `.substr(0, 3)
}

export function toLocation(a, stations) {
  if (a.to) {
    return stationName(a.to, stations)
  }
}

export function stationName(locationSignature, stations = []) {
  const fullName = stations[locationSignature]
  if (!fullName) return locationSignature
  if (fullName.startsWith('Sthlm ')) return fullName.substring(6)
  if (fullName.startsWith('Stockholms s')) return `S${fullName.substring(12)}`
  if (fullName.startsWith('Stockholm ')) return fullName.substring(10)
  if (fullName.startsWith('Södertälje h')) return 'Södertälje H'
  if (fullName.startsWith('Södertälje ')) return fullName.substring(0, 12)
  if (fullName.startsWith('Upplands ')) return fullName.substring(9)
  if (fullName.startsWith('Väster')) return `V-${fullName.substring(6)}`
  return fullName
}

export function time(a) {
  if (a.actual) {
    return a.actual.substr(14, 2)
  }

  if (a.estimated) {
    return a.estimated.substr(14, 2)
  }
}

export function minute(t) {
  return t ? t.substr(13, 3) : '   '
}

export function countdown({ advertised, estimated } = {}, now) {
  const t = estimated || advertised
  if (t) {
    const m = difference_in_minutes(t, now)
    const s = difference_in_seconds(t, now)
    if (s <= -100) return ''
    if (s < 100) return `${s}s`
    if (m < 10) {
      const seconds = s - m * 60
      return `${m}:${seconds < 10 ? '0' : ''}${seconds}`
    }
    return `${m}min`
  }
}
