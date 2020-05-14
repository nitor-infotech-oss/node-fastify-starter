import userService from '../../services/users/userService'


const userRoutes = async app => {
  app.addHook('preHandler', (request, reply, done) => {
    app.authenticate(request, reply, done)
    done()
  })
  app.get('/', async (request, reply) => {
    app.log.info('request.query', request.query);
    const products = await userService.getAll();
    reply.send(products);
  });

  app.get('/:id', async (request, reply) => {
    app.log.info('request.query', request.query);
    const products = await userService.getUser(request.params.id);
    return products;
  });
};

module.exports = userRoutes;