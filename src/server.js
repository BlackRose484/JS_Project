const path = require('path');
const express = require('express')
const exphbs = require('express-handlebars').engine;
const route = require('./routes')
const db = require('./config/db');
const Cookies = require('cookie-parser');


const app = express()
const port = 3000
const server = require('http').createServer(app);
const io = require('socket.io')(server);

db.connect();
app.use(Cookies())
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());


app.engine(
    'hbs',
    exphbs({
    extname: '.hbs',
    })
    );

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resoures/views'));

route(app)

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
  });
});




const PORT = process.env.PORT||3000

server.listen(3000, () => {
  console.log(`Example app listening on port ${PORT}`)
})