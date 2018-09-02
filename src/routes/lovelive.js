import express from 'express'
import lovelive from '../service/lovelive'

const router = express.Router()

router.get('/cleanCards', async (req, res, next) => {
  try {
    const result = await lovelive.getCleanCards()
    return res.json(result)
  } catch(e) {
    next(e)
  }
})

export default router
