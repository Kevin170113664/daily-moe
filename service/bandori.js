import _ from 'lodash'
import shortid from 'shortid'
import r from '../helper/request'
import artPictureData from '../static/bandori/bandori-art-cards'

const baseUrl = 'https://bandori.party/api'

const getArtPictures = async () => {
  const maxPageSize = 120
  const cardIds = await r.get(`${baseUrl}/cardids`)
  const pages = _.range(1, Math.ceil(cardIds.length / maxPageSize) + 1)

  const artPicture = {}
  await Promise.all(_.map(pages, async (page) => {
    const res = await r.get(`${baseUrl}/cards?page=${page}&page_size=${maxPageSize}`)
    _.each(res.results, result => {
      if (!_.isEmpty(result.art) && !_.isEmpty(result.art_trained)) {
        artPicture[shortid.generate()] = result.art
        artPicture[shortid.generate()] = result.art_trained
      }
    })
  }))

  return artPicture
}

const getRandomPictures = async ({pageSize, existingIds = []}) => {
  if (!_.isFinite(pageSize) || pageSize < 1) pageSize = 20;

  const randomKeys = _.chain(artPictureData)
    .keys()
    .difference(existingIds)
    .shuffle()
    .slice(0, pageSize)
    .value()

  return _.pick(artPictureData, randomKeys)
}

export default {getArtPictures, getRandomPictures}