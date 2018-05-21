let express = require('express');
let routes = express.Router();

// school homepage
routes.get('/', function(req, res) {
  res.render('home');
});

module.exports = routes;