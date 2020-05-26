import userService from '../../../../services/users/userService'
import { LoginUser } from './type'

const authenticationRoutes = async (app) => {
  app.post('/login', { schema: LoginUser }, async (request, reply) => {
    const user = await userService.loginUser(request.body)
    if (user) {
      let access_token = app.generateToken(user)
      reply.code(200).send({
        user: user,
        access_token: access_token
      })
    } 
    else {
      reply.code(400).send('Login Failed.')
    }
  })
}

module.exports = authenticationRoutes
