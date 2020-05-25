import userService from '../../../services/users/userService'
import {LoginUser} from './type'

const authenticationRoutes = async (app) => {
  app.post('/login', {schema: LoginUser}, async (request, reply) => {
    const user = await userService.loginUser(request.body) 
    if(user) {
        reply.code(200).send(user)
    } else {
        reply.code(400).send('Login Failed.')
    }

  })

}

module.exports = authenticationRoutes
