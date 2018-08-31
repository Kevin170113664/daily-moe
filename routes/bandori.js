import express from 'express'
import bandori from '../service/bandori'

const router = express.Router()

router.get('/cards', async (req, res, next) => {
  try {
    const cards = await bandori.getLatestCards()
    return res.json(cards)
  } catch(e) {
    next(e)
  }
})

export default router
