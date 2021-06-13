const express = require('express');
const handlebars = require('express-handlebars');
const hbs = require('handlebars');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3000;
//auto get index.js 
const route =  require('./routes/index')

//HTTP logger
//db connect
const db = require('./config/db');
db.connect();

//image folder
app.use(cors());

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

//template engine
app.engine('hbs', handlebars({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources' ,'views'));

//hbs.registerHelper
// routing
route(app);

//port listening
app.listen(port, () => console.log(`App listen at port ${port}`) );
