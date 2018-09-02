import express from 'express'
import cinderella from '../service/cinderella'

const router = express.Router()

router.get('/spreadCards', async (req, res, next) => {
  try {
    const result = await cinderella.getSpreadCards()
    return res.json(result)
  } catch(e) {
    next(e)
  }
})

export default router
