const AuthController = require('./auth');

function route(app)
{
  app.use('/auth',AuthController);
  app.get('/', (req, res) => {
      res.render('home');
    })
}

module.exports = route