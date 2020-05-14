const apiRoutes = async app => {
    app.register(require('./users'), { prefix: '/users' });
  };
  
module.exports = apiRoutes;