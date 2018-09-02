import express from 'express'
import bandori from '../service/bandori'

const router = express.Router()

router.get('/artCards', async (req, res, next) => {
  try {
    const result = await bandori.getArtPictures()
    return res.json(result)
  } catch(e) {
    next(e)
  }
})

router.post('/randomCards', async (req, res, next) => {
  try {
    const {pageSize} = req.query
    const {existingIds} = req.body;
    const result = await bandori.getRandomPictures({pageSize, existingIds})
    return res.json(result)
  } catch(e) {
    next(e)
  }
})

export default router
