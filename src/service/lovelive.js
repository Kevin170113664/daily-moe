import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import shortid from 'shortid'
import r from '../helper/request'
import loveliveStaticData from '../static/lovelive-clean-cards'

const baseUrl = 'https://schoolido.lu/api'

const getCleanCards = async () => {
  const maxPageSize = 100
  const res = await r.get(`${baseUrl}/cards/?page_size=1&rarity=UR,SSR`)
  const pages = _.range(1, Math.ceil(res.count / maxPageSize) + 1)

  const cleanPicture = {}
  await Promise.all(_.map(pages, async (page) => {
    const res = await r.get(`${baseUrl}/cards/?page=${page}&page_size=${maxPageSize}&rarity=UR,SSR`)
    _.each(res.results, result => {
      if (!_.isEmpty(result.clean_ur)) cleanPicture[shortid.generate()] = `https:${result.clean_ur}`
      if (!_.isEmpty(result.clean_ur_idolized)) cleanPicture[shortid.generate()] = `https:${result.clean_ur_idolized}`
    })
  }))

  if (_.values(cleanPicture).length > _.values(loveliveStaticData).length) {
    const staticJSONPath = path.join(__dirname, '../static/lovelive-clean-cards.json')
    fs.writeFileSync(staticJSONPath, JSON.stringify(cleanPicture))
  }

  return cleanPicture
}

export default {getCleanCards}