import path from 'path'
import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/images/sample.gif'))
});

export default router
