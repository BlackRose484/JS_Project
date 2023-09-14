const AuthController = require('./auth');
const MeController = require('./me');
const ServerController = require('./server');
const ChatController = require('./chat');
const {Protect,CheckUser} = require('../app/middlewares/AuthMiddleware');

function route(app)
{

  app.get('*',CheckUser);
  app.use('/auth',AuthController);
  app.use('/server',ServerController);
  app.use('/me',Protect,MeController);
  app.use('/chat',Protect,ChatController);
  app.get('/', (req, res) => {
      res.render('home');
    })
}

module.exports = route