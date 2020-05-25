import config from '../../../config/app'

module.exports = {
  routePrefix: '/api-docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Node starter kit swager',
      description: 'docs',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    servers: [
      { url: `http://localhost:${config.get('port')}`, description: 'local development' },
      { url: 'https://dev.your-site.com', description: 'development' },
      { url: 'https://sta.your-site.com', description: 'staging' },
      { url: 'https://pro.your-site.com', description: 'production' }
    ],
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'User', description: 'User related end-points' }
    ],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: ''
      },
    }
  }
};