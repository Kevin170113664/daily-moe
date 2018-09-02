import _ from 'lodash'
import lovelive from '../../src/service/lovelive'
import cleanCards from '../test-data/clean-cards'

describe('lovelive api', () => {
  test('should be able to get all clean cards', async () => {
    const picture = await lovelive.getCleanCards()
    expect(_.difference(_.values(picture), cleanCards)).toEqual([]);
  }, 10000);
})
