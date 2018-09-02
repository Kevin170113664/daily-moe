import fs from 'fs';
import _ from 'lodash'
import path from 'path';
import shortid from 'shortid'
import r from '../helper/request'
import cinderellaStaticData from '../static/cinderella-spread-cards';

const baseUrl = 'https://starlight.kirara.ca/api'
const getImageUrl = id => `https://truecolor.kirara.ca/spread/${id}.png`

const getSpreadCards = async () => {
  const res = await r.get(`${baseUrl}/v1/list/card_t`)
  const cardIds = _.chain(res.result)
    .filter({has_spread: true})
    .map('id')
    .value()

  const spreadPicture = _.reduce(cardIds, (current, cardId) => {
    current[shortid.generate()] = getImageUrl(cardId)
    return current
  }, {})

  if (_.values(spreadPicture).length > _.values(cinderellaStaticData).length) {
    const staticJSONPath = path.join(__dirname, '../static/cinderella-spread-cards.json');
    fs.writeFileSync(staticJSONPath, JSON.stringify(spreadPicture))
  }

  return spreadPicture
}

export default {getSpreadCards}