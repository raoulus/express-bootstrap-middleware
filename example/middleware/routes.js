'use strict';

const glob = require('glob');
const path = require('path');

module.exports = function(app) {
  const routesRoot = path.join(__dirname, '..', 'routes');
  const routes = glob.sync('**/*.js', {cwd: routesRoot});
  routes.forEach(function(route) {
    let routePath = '/' + route.replace('.js', '');
    let router = require(path.join(routesRoot, route));
    
    console.log(`Loading route ${routePath}`);
    app.use(routePath, router);

    // extra route for /
    if (routePath === '/index') {
      app.use('/', router);
    }
  });
};
