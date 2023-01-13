const convict = require('convict')

const config = convict({
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: 'Node Boilerplate'
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
    env: 'APP_LOG_LEVEL'
  },
  db: {
    name: {
      doc: 'Database Name',
      format: String,
      default: '',
      env: 'DB_NAME'
    },
    user: {
      doc: 'Database user',
      format: String,
      default: '',
      env: 'DB_USER'
    },
    password: {
      doc: 'Database password',
      format: '*',
      default: '',
      env: 'DB_PASSWORD'
    },
    host: {
      doc: 'DB host',
      format: String,
      default: '',
      env: 'DB_HOST'
    },
    port: {
      doc: 'DB PORT',
      format: 'port',
      default: '',
      env: 'DB_PORT'
    }
  },
  secret_key: {
    doc: 'App authentication secret key.',
    format: String,
    default: 'nutech secret key',
    env: 'SECRET_KEY'
  },
  aws_s3: {
    access_key: {
      doc: 'Access Key for AWS',
      format: String,
      default: '',
      env: 'AWS_ACCESS_KEY'
    },
    secret_key: {
      doc: 'Secret key for AWS S3',
      format: String,
      default: '',
      env: 'AWS_SECRET_ACCESS_KEY'
    },
    region: {
      doc: 'Hosting region',
      format: String,
      default: 'us-east-1',
      env: 'REGION'
    },
    bucket: {
      doc: 'Name of bucket to access',
      format: String,
      default: '',
      env: 'BUCKET'
    }
  },
  mailer_info: {
    sendgrid_key: {
      doc: 'sentry dns',
      format: String,
      default: '',
      env: 'SENDGRID_API_KEY'
    },
    verification: { // Example of template config
      templateName: {
        doc: 'Name of template to be sent',
        format: String,
        default: 'account-verification',
        env: 'ACCOUNT_VERIFICATION'
      },
      subject: {
        doc: 'Subject for sending verification/activation mail to users',
        format: String,
        default: 'Account Activation',
        env: 'VERIFICATION_SUBJECT'
      }
    },
    sender: {
      doc: 'Email id of sender (need not exist)',
      format: String,
      default: 'DO-NOT-REPLY@something.com',
      env: 'SENDER_ID'
    }
  },
})

config.validate({ allowed: 'strict' })

module.exports = config
