const userProperties = {
  id: { type: 'number' },
  firstName: { type: 'string' },
  lastName: { type: 'string', nullable: true },
  email: { type: 'string' },
  password: { type: 'string' },
  isActive: { type: 'boolean'},
  company: { type: 'string'},
  created_at: { type: 'string' },
  updated_at: { type: 'string' }
}

const createSchema = {
  firstName: { type: 'string' },
  lastName: { type: 'string'},
  email: { type: 'string' },
  password: { type: 'string' },
  isActive: { type: 'boolean'},
  company: { type: 'string'},
}

const tags = ['User']


const getAllUsers = {
  tags,
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: userProperties
      }
    }
  },
  security: [
    {
      JWT: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: ''
    }}
  ]
}

const getOneUser = {
  tags,
  response: {
    200: {
      type: 'object',
      properties: userProperties
    }
  }
}

const createOneUser = {
  tags,
  body: {
    properties: createSchema
  },
  response: {
    201: {
      type: 'object',
      properties: userProperties
    }
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  createOneUser
}
