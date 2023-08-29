const path = require('path');
const express = require('express')
const exphbs = require('express-handlebars').engine;
const route = require('./routes')
const db = require('./config/db');


const app = express()
const port = 3000

db.connect();
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})