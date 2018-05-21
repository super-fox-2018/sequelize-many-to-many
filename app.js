const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const routes = require('./routes');
const helpers = require('./helpers');

const app = express();

app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.record = null;
  res.locals.message = '';
  next();
});

app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming request data
app.use(bodyParser.urlencoded({ extended : false }));

// Setup method override
app.use(methodOverride('_method'));

app.use('/', routes);

const server = app.listen(3000, () => {
  console.log(`🙂  🙂  🙂  Server is running on port ${server.address().port}`);
});