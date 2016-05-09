'use strict';

const fs = require('fs');
const path = require('path');
const middlewareRoot = path.join(path.dirname(require.main.filename), 'middleware');

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
    config = require.main.require('./middleware.json').middlewares;
    console.log(`Loading middlewares from configuration middleware.json`);
  } catch(e) {
    console.log(`No middleware configuration found. Loading middlewares automatically from ${middlewareRoot}`);
  }
  return config;
}
