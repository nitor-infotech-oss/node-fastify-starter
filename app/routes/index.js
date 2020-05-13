const apiRoutes = async (app, options) => {
    app.register(require('./users'), { prefix: '/users' });
  };
  
  module.exports = apiRoutes;