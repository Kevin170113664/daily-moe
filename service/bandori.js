import _ from 'lodash'
import r from '../helper/request'

const baseUrl = 'https://bandori.party/api'

const getLatestCards = async () => {
  const maxPageSize = 120;
  const cardIds = await r.get(`${baseUrl}/cardids`)
  const pages = _.range(1, Math.ceil(cardIds.length / maxPageSize) + 1)

  const cards = await Promise.all(_.map(pages, async (page) => {
    const res = await r.get(`${baseUrl}/cards?page=${page}&page_size=${maxPageSize}`)
    return _.reduce(res.results, (results, result) => {
      if (!_.isEmpty(result.art)) results.push(result.art)
      if (!_.isEmpty(result.art_trained)) results.push(result.art_trained)
      return results
    }, [])
  }))

  return _.flatten(cards)
}

export default {getLatestCards}