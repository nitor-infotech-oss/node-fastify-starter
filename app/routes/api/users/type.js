const userProperties = {
  id: { type: 'number' },
  name: { type: 'string' },
  lastName: { type: 'string', nullable: true },
  gender: {
    type: 'string',
    enum: ['M', 'F']
  },
  email: { type: 'string' },
  phone: { type: 'number', maximum: 9999999999 },
  created_at: { type: 'string' },
  updated_at: { type: 'string' }
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
  }
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

module.exports = {
  getAllUsers,
  getOneUser
}
