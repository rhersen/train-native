import groupby from 'lodash.groupby'
import keyby from 'lodash.keyby'
import head from 'lodash.head'
import map from 'lodash.map'
import mapvalues from 'lodash.mapvalues'

export function station(trainAnnouncements) {
  if (!Array.isArray(trainAnnouncements) || !trainAnnouncements.length) {
    return {}
  }
  const trainAnnouncement = head(trainAnnouncements)
  const { LocationSignature } = trainAnnouncement

  return {
    location: LocationSignature,
    trains: map(trainAnnouncements, trainAnnouncement => {
      const {
        ActivityType,
        AdvertisedTimeAtLocation,
        EstimatedTimeAtLocation,
        AdvertisedTrainIdent,
        TimeAtLocation,
      } = trainAnnouncement
      return {
        to: map(trainAnnouncement.ToLocation, 'LocationName').join(),
        id: AdvertisedTrainIdent,
        key: AdvertisedTrainIdent,
        activity: ActivityType,
        advertised: AdvertisedTimeAtLocation,
        estimated: EstimatedTimeAtLocation,
        actual: TimeAtLocation,
      }
    }),
  }
}

export function train(trainAnnouncements) {
  if (!Array.isArray(trainAnnouncements) || !trainAnnouncements.length) {
    return {}
  }

  const [{ AdvertisedTrainIdent, ToLocation }] = trainAnnouncements

  return {
    id: AdvertisedTrainIdent,
    to: map(ToLocation, 'LocationName').join(),
    locations: map(
      groupby(trainAnnouncements, 'LocationSignature'),
      locationObject
    ),
  }
}

function locationObject(group, key) {
  return {
    key,
    location: key,
    ...mapvalues(keyby(group, 'ActivityType'), times),
  }
}

function times(trainAnnouncement) {
  const {
    AdvertisedTimeAtLocation,
    EstimatedTimeAtLocation,
    TimeAtLocation,
  } = trainAnnouncement
  return {
    advertised: AdvertisedTimeAtLocation,
    estimated: EstimatedTimeAtLocation,
    actual: TimeAtLocation,
  }
}
