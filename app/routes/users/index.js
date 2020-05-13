import userService from '../../services/users/userService'


const userRoutes = async app => {
  app.get('/', async (request, reply) => {
    app.log.info('request.query', request.query);
    const products = await userService.getAll();
    return products;
  });

  app.get('/:id', async (request, reply) => {
    app.log.info('request.query', request.query);
    const products = await userService.getUser(request.params.id);
    return products;
  });
};

module.exports = userRoutes;