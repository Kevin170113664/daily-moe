import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import shortid from 'shortid'
import r from '../helper/request'
import bandoriStaticData from '../static/bandori/bandori-art-cards'

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

  if (_.values(artPicture).length > _.values(bandoriStaticData).length) {
    fs.writeFileSync(path.join(__dirname, '../static/bandori/bandori-art-cards.json'), JSON.stringify(artPicture))
  }

  return artPicture
}

const getRandomPictures = async ({pageSize, existingIds = []}) => {
  if (!_.isFinite(pageSize) || pageSize < 1) pageSize = 20;

  const randomKeys = _.chain(bandoriStaticData)
    .keys()
    .difference(existingIds)
    .shuffle()
    .slice(0, pageSize)
    .value()

  return _.pick(bandoriStaticData, randomKeys)
}

export default {getArtPictures, getRandomPictures}