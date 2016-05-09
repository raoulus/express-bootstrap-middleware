'use strict';

const fs = require('fs');
const path = require('path');
const middlewareRoot = path.join(__dirname, '..', 'middleware');

module.exports = function(app, cb) {
  let middlewares = getJSONConfig() || fs.readdirSync(middlewareRoot);
  middlewares.forEach(function(middleware) {
    console.log(`Loading middleware ${middleware}`);
    let middlewarePath = path.join(middlewareRoot, middleware);
    require(path.join(middlewareRoot, middleware))(app);
  })
  cb();
}

function getJSONConfig() {
  let config = null;
  try {
    config = require(path.join(__dirname, '..', 'middlewares.json')).middlewares;
  } catch(e) {}
  return config;
}
