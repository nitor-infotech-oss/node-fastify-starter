//const { ProductService } = require('../../../services/products');


const userRoutes = async app => {
  //const productService = new ProductService(app);
  // get all
  app.get('/', async (request, reply) => {
    app.log.info('request.query', request.query);
    //const products = await productService.getAll({ filter: {} });
    return 'products';
  });
};

module.exports = userRoutes;