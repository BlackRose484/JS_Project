const AuthController = require('./auth');
const {Protect,CheckUser} = require('../app/middlewares/AuthMiddleware');

function route(app)
{
  app.get('*',CheckUser);
  app.use('/auth',AuthController);
  app.get('/', (req, res) => {
      res.render('home');
    })
}

module.exports = route