import path from 'path'
import logger from 'morgan'
import express from 'express'
import createError from 'http-errors'
import swaggerUi from 'swagger-ui-express'

import publicRouter from './routes/public'
import bandoriRouter from './routes/bandori'
import loveliveRouter from './routes/lovelive'
import cinderellaRouter from './routes/cinderella'
import swaggerDocument from '../swagger.json'

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/ping', express.Router().get('/', (req, res, next) => res.send('pong')))
app.use('/api/public', publicRouter)
app.use('/api/bandori', bandoriRouter)
app.use('/api/lovelive', loveliveRouter)
app.use('/api/cinderella', cinderellaRouter)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customSiteTitle: 'Daily Moe API' }))

app.use((req, res, next) => next(createError(404)))

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

export default app
