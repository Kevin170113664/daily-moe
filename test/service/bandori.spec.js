import _ from 'lodash'
import bandori from '../../service/bandori'
import artPictures from '../test-data/art-cards'

describe('bandori api', () => {
  test('should be able to get all art cards', async () => {
    const picture = await bandori.getArtPictures()
    expect(Object.values(picture)).toEqual(artPictures);
  }, 10000);

  describe('get random pictures', () => {
    test('should be able to get pictures according to page size from static json', async () => {
      const picture = await bandori.getRandomPictures({pageSize: 20})
      expect(_.values(picture)).toHaveLength(20)
    });

    test('should be able to get pictures exclude exiting picture ids', async () => {
      const existingIds = [
        'xrQOlBrjTCT', 'J9tsWMIBdR9', 'spqjCTdvmtON', 'B9waij2PgN26', 'KiggkcjGiTt', '4fYxJRDW_pNm',
        'okm-QtB_xi7p', 'AdVqMuFKuXk', 'HMShh581ubI6', 'KLpC_Pqne27Z', 'lbUTD3xM-dB', 'KaY1YduYWPF', 'y6mZhe1pGUF',
        '-6BX09Atap', 'EbkUNdvhgGa', 'lZdMXpiqmnK', 'BSfzFHWDA3Iq', 'YK1CWGQ3JFpS', 'zghuhBJVtqQg', 'QEJJUozet8Hw'
      ]

      const picture = await bandori.getRandomPictures({pageSize: 20, existingIds})

      expect(_.values(picture)).toHaveLength(20)
      expect(_.intersection(_.keys(picture), existingIds)).toEqual([])
    });
  })
})
