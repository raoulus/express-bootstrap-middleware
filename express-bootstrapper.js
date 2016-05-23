'use strict';

const fs = require('fs');
const path = require('path');
let debug = require('debug')('express-bootstrapper');

/**
 * Bootstraps a list of files (provided by a configuration)
 *
 * @param  {object}   app  the express application
 * @param  {object}   opts possible options are
 *                         - directory = root dir from which files will be loaded
 *                         - configFileName = name of the configuration file
 * @param  {Function} cb   callback
 */
module.exports = function(app, opts, cb) {
  opts = opts || {};
  const rootDir = process.env.APP_ROOT || path.resolve();
  const bootstrapRoot = path.join(rootDir, opts.directory || 'bootstrap');
  let bootstrapItems = getJSONConfig(opts) || fs.readdirSync(bootstrapRoot);
  bootstrapItems.forEach(function(bootstrapItem) {
    if (typeof bootstrapItem === 'object') {
      let name = Object.keys(bootstrapItem)[0];
      bootstrapItem[name].forEach((subItem) => {
        debug(`Loading ${name}/${subItem}`);
        require(path.resolve(rootDir, name, subItem))(app);
      });
    } else {
      debug(`Loading ${bootstrapItem}`);
      require(path.resolve(bootstrapRoot, bootstrapItem))(app);
    }
  });

  if (cb) {
    cb();
  }
};

function getJSONConfig(opts) {
  let config = null;
  let configFileName = opts.configFileName || 'bootstrap.json';
  try {
    config = require(path.resolve(`./${configFileName}`)).bootstrap;
    debug(`Bootstrapping ${configFileName}`);
  } catch (e) {
    debug(`No bootstrap configuration found. Loading middlewares automatically from default folder`);
  }
  return config;
}
