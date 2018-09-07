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
  if (fullName.startsWith('Upplands ')) return fullName.substring(9)
  if (fullName.startsWith('Väster')) return `V-${fullName.substring(6)}`
  return fullName
}

export function time(a) {
  if (a.AdvertisedTimeAtLocation) {
    return (
      a.AdvertisedTimeAtLocation.substr(11, 2) +
      minute(a.AdvertisedTimeAtLocation) +
      minute(a.EstimatedTimeAtLocation) +
      minute(a.TimeAtLocation)
    )
  }

  if (a.advertised) {
    return (
      a.advertised.substr(11, 2) +
      minute(a.advertised) +
      minute(a.estimated) +
      minute(a.actual)
    )
  }
}

function minute(t) {
  return t ? t.substr(13, 3) : '   '
}
