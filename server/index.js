// we need this file because of this issue:
// https://github.com/fastify/fastify-cli/issues/131

import 'make-promises-safe'
import Fastify from 'fastify'
import nodeServer from './app'
import config from '../config/app'

export default function start () {
  const port = config.get('port')
  const env = process.env.NODE_ENV

  const fastify = Fastify(nodeServer.options)
  fastify.register(nodeServer)

  if (process.env.NODE_ENV !== 'production') {
    const blipp = require('fastify-blipp')
    fastify.register(blipp)
  }

  fastify.log.debug(`Initializing API`)
  fastify.log.info(`Server Name : ${config.get('app.name')}`)
  fastify.log.info(`Environment  : ${env || 'development'}`)
  fastify.log.info(`App Port : ${port}`)
  fastify.log.info(`Process Id : ${process.pid}`)

  fastify.listen(port, '::', err => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    if (process.env.NODE_ENV !== 'production') {
      fastify.blipp()
    }
  })
}
