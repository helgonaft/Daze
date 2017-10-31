const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const HTTPStatus = require('http-status');

const index = require('./routes/index');

const app = express();
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = HTTPStatus.NOT_FOUND;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || HTTPStatus.INTERNAL_SERVER_ERROR);
  res.send({message: err.message, status: err.status});
});

module.exports = app;
