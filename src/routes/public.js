import express from 'express'
import publicSrv from '../service/public'

const router = express.Router()

router.post('/randomCards', async (req, res, next) => {
  try {
    const {pageSize} = req.query
    const {existingIds} = req.body
    const result = await publicSrv.getRandomPictures({pageSize, existingIds})
    return res.json(result)
  } catch(e) {
    next(e)
  }
})

export default router
