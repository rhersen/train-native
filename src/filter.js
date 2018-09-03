import map from 'lodash.map'
import head from 'lodash.head'

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
  const trainAnnouncement = head(trainAnnouncements)
  const { AdvertisedTrainIdent } = trainAnnouncement

  return {
    id: AdvertisedTrainIdent,
    to: map(trainAnnouncement.ToLocation, 'LocationName').join(),
    locations: map(trainAnnouncements, trainAnnouncement => {
      const {
        ActivityType,
        AdvertisedTimeAtLocation,
        EstimatedTimeAtLocation,
        LocationSignature,
        TimeAtLocation,
      } = trainAnnouncement
      return {
        location: LocationSignature,
        activity: ActivityType,
        key: LocationSignature + ActivityType,
        advertised: AdvertisedTimeAtLocation,
        estimated: EstimatedTimeAtLocation,
        actual: TimeAtLocation,
      }
    }),
  }
}
