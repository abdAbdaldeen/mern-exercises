var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var logger = require('morgan');
var cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require('dotenv');


var usersRouter = require('./routes/users');
var testApi = require('./routes/testApi');

var app = express();
dotenv.config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoose
  .connect(process.env.Url, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((e) => {

    console.log('Connection failed! -> '+ e);
  });


app.use('/users', usersRouter);
app.use('/api', testApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
