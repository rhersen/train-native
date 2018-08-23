export function activity(a) {
  const s = a.ActivityType || a.activity || '   '
  return `${s}   `.substr(0, 3)
}

export function toLocation(a, stations) {
  if (a.to) {
    return `${stationName(a.to, stations)}           `.substr(0, 12)
  }
}

export function stationName(locationSignature, stations = []) {
  return stations[locationSignature] || locationSignature
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
