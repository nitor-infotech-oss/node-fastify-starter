import server from './server'
import logger from './server/logger'
import Raven from './server/raven'

const logErrors = error => {
  logger.error(error.message, { stack: error.stack })
  Raven.captureException(error)
  throw error
}

process.on('uncaughtException', logErrors)
process.on('unhandledRejection', error => {
  console.log('unhandledRejection => ', error)
  Raven.captureException(error)
})

server()
