import Raven from 'raven'
import config from '../config/app'

Raven.config(config.get('sentry_dns'), {
  environment: config.get('env'),
  name: config.get('app.name')
}).install()

export default Raven
