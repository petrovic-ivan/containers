const express = require('express');
const httpError = require('http-errors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('../routes/index.route');
const config = require('./config');

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '1mb', type: 'application/json'}));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());
app.use(helmet());
app.use(cors());
app.use('/api/', routes);

app.use((req, res, next) => {
  const err = new httpError(404)
  return next(err);
});

app.use((err, req, res, next) => {

  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join("; ");
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

module.exports = app;
