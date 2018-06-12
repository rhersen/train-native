export function toLocation(a, stations) {
  if (a.ToLocation) {
    const s = `${a.ToLocation.map(l =>
      stationName(l.LocationName, stations)
    )}   `
    return `${s}     `.substr(0, 11)
  }
}

export function stationName(locationSignature, stations) {
  return stations[locationSignature] || locationSignature
}

export function activity(a) {
  const s = a.ActivityType
  if (s) {
    return `${s}     `.substr(0, 3)
  }
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
}

function minute(t) {
  return t ? t.substr(13, 3) : '   '
}
