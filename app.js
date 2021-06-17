require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const reviewsRouter = require('./routes/reviews');
const User = require('./models/user');

const app = express();

/* ========== Database setup ========== */

const MONGODB_URL =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/surf-shop';
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const dbConnection = mongoose.connection;
dbConnection.on('open', () =>
  console.log('Successfully connected to database...'),
);
dbConnection.on(
  'error',
  console.error.bind(console, 'Database connection error'),
);
dbConnection.on('close', () => console.log('Database connection is closed.'));

/* ========== Middlewares ========== */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ========== Passport and Session ========== */

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

/* ========== Routes ========== */

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
