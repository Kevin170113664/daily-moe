import _ from 'lodash'
import bandoriStaticData from '../static/bandori-art-cards'
import loveliveStaticData from '../static/lovelive-clean-cards'
import cinderellaStaticData from '../static/cinderella-spread-cards'

const getRandomPictures = ({pageSize, existingIds = []}) => {
  pageSize = parseInt(pageSize)
  if (!_.isFinite(pageSize) || pageSize < 1) pageSize = 20

  const allStaticData = {...bandoriStaticData, ...loveliveStaticData, ...cinderellaStaticData}
  const randomKeys = _.chain(allStaticData)
    .keys()
    .difference(existingIds)
    .shuffle()
    .slice(0, pageSize)
    .value()

  return _.pick(allStaticData, randomKeys)
}

export default {getRandomPictures}