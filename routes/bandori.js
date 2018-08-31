import express from 'express'
import bandori from '../service/bandori'

const router = express.Router()

router.get('/artCards', async (req, res, next) => {
  try {
    const cards = await bandori.getArtPictures()
    return res.json(cards)
  } catch(e) {
    next(e)
  }
})

export default router
