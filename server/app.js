import { join } from 'path'
import AutoLoad from 'fastify-autoload'
import noIcon from 'fastify-no-icon'
import helmet from 'fastify-helmet'
import qs from 'qs'
import cors from 'fastify-cors'
import Raven from './raven'
import logger from './logger'

export default function NodeServer (fastify, opts, next) {
  fastify.use(Raven.requestHandler())
  fastify.register(cors, {
    allowedHeaders: ['Content-Type', 'Authorization']
  })
  fastify.register(helmet)
  fastify.register(noIcon)

  fastify.use(function (req, res, next) {
    req.logger = logger
    next()
  })

  // This loads all routes and services defined in services folder
  fastify.register(AutoLoad, {
    dir: join(__dirname, '../app/services'),
    includeTypeScript: true,
    options: { ...opts }
  })

  fastify.setErrorHandler(function errorHandler (err, req, reply) {
    Raven.errorHandler(err, req)
    reply.status(500).send({
      error: err.stack
    })
  })

  next()
}

NodeServer.options = {
  querystringParser: str => qs.parse(str),
  logger: { level: 'info' },
  ignoreTrailingSlash: true
}
