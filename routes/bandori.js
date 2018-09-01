import express from 'express'
import bandori from '../service/bandori'

const router = express.Router()

router.get('/artCards', async (req, res, next) => {
  try {
    const card = await bandori.getArtPictures()
    return res.json(card)
  } catch(e) {
    next(e)
  }
})

router.post('/randomCards', async (req, res, next) => {
  try {
    const {pageSize} = req.query
    const {existingIds} = req.body;
    const card = await bandori.getRandomPictures({pageSize, existingIds})
    return res.json(card)
  } catch(e) {
    next(e)
  }
})

export default router
