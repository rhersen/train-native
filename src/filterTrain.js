import map from 'lodash.map'

export default trainAnnouncements => {
  if (!Array.isArray(trainAnnouncements)) {
    return []
  }

  return map(trainAnnouncements, trainAnnouncement => {
    const {
      ActivityType,
      AdvertisedTimeAtLocation,
      AdvertisedTrainIdent,
      EstimatedTimeAtLocation,
      LocationSignature,
      TimeAtLocation,
    } = trainAnnouncement

    return {
      ActivityType,
      AdvertisedTimeAtLocation,
      AdvertisedTrainIdent,
      EstimatedTimeAtLocation,
      LocationSignature,
      TimeAtLocation,
      ToLocation: map(trainAnnouncement.ToLocation, 'LocationName').join(),
    }
  })
}
