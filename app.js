require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const session      = require('express-session');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors')
const passport     = require('passport')
const cloudinary   = require('cloudinary').v2



require('./configs/passport-config');

mongoose
  .connect('mongodb+srv://admin:NeQvtFxgFhp3s6d@cluster0.dtqz4.mongodb.net/sjaak_mem?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// CORS
app.use(
  cors({
    credentials: true,
    origin: [process.env.CORS_ALLOWED]
  })
);

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// SESSION SETTINGS:
app.use(session({
  secret:"ironducks jumping through the mountains",
  resave: true,
  saveUninitialized: true
}));


// USE passport.initialize() and passport.session():
app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'Van mama voor Tess';



const index = require('./routes/index');
app.use('/', index);

const memoryRoutes = require('./routes/memory/Memory');
app.use('/', memoryRoutes);

const AuthRoutes = require('./routes/auth/Auth');
app.use('/', AuthRoutes);

module.exports = app;
