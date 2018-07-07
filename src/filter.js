import map from 'lodash.map'
import head from 'lodash.head'

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
        advertised: AdvertisedTimeAtLocation,
        estimated: EstimatedTimeAtLocation,
        actual: TimeAtLocation,
      }
    }),
  }
}
