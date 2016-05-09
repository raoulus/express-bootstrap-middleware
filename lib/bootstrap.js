'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function(app, opts, cb) {
  opts = opts || {};
  const rootDir = process.env.APP_ROOT || path.dirname(require.main.filename);
  const bootstrapRoot = path.join(rootDir, opts.bootstrapDirectory || 'bootstrap');
  let bootstrapItems = getJSONConfig() || fs.readdirSync(bootstrapRoot);
  bootstrapItems.forEach(function(bootstrapItem) {
    if (typeof bootstrapItem === 'object') {
      let name = Object.keys(bootstrapItem)[0];
      bootstrapItem[name].forEach((subItem) => {
        console.log(`Loading ${name}/${subItem}`);
        require(path.resolve(rootDir, name, subItem))(app);
      });
    } else {
      console.log(`Loading ${bootstrapItem}`);
      require(path.resolve(bootstrapRoot, bootstrapItem))(app);
    }
  });

  if (cb) {
    cb();
  }
};

function getJSONConfig() {
  let config = null;
  try {
    config = require.main.require('./bootstrap.json').bootstrap;
    console.log(`Bootstrapping bootstrap.json`);
  } catch (e) {
    console.log(`No bootstrap configuration found. Loading middlewares automatically from default folder`);
  }
  return config;
}
