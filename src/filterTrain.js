import map from 'lodash.map'
import head from 'lodash.head'

export default trainAnnouncements => {
  if (!Array.isArray(trainAnnouncements) || !trainAnnouncements.length) {
    return {}
  }
  const trainAnnouncement = head(trainAnnouncements)
  const { AdvertisedTrainIdent } = trainAnnouncement

  return {
    AdvertisedTrainIdent,
    ToLocation: map(trainAnnouncement.ToLocation, 'LocationName').join(),
    Locations: map(trainAnnouncements, trainAnnouncement => {
      const {
        ActivityType,
        AdvertisedTimeAtLocation,
        EstimatedTimeAtLocation,
        LocationSignature,
        TimeAtLocation,
      } = trainAnnouncement
      return {
        LocationSignature,
        ActivityType,
        AdvertisedTimeAtLocation,
        EstimatedTimeAtLocation,
        TimeAtLocation,
      }
    }),
  }
}
