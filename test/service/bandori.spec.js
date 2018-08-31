import bandori from '../../service/bandori'
import allCards from '../test-data/art-cards'

test('should be able to get all cards', async () => {
  const cards = await bandori.getLatestCards()
  expect(cards).toEqual(allCards);
}, 10000);