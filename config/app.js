const convict = require('convict')

const config = convict({
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: 'EHR RPC Server'
    }
  },

  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },

  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },

  sentry_dns: {
    doc: 'sentry dns',
    format: String,
    default: '',
    env: 'SENTRY_DNS'
  },

  log_level: {
    doc: 'level of logs to show',
    format: String,
    default: 'debug',
    env: 'RPC_LOG_LEVEL'
  }
})

config.validate({ allowed: 'strict' })

module.exports = config
