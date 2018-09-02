import _ from 'lodash'
import cinderella from '../../src/service/cinderella'
import spreadCards from '../test-data/spread-cards'

describe('cinderella api', () => {
  test('should be able to get all spread cards', async () => {
    const picture = await cinderella.getSpreadCards()
    expect(_.difference(_.values(picture), spreadCards)).toEqual([]);
  }, 10000);
})
