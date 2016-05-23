'use strict';

let express = require('express');
let app = express();
let bootstrap = require('../express-bootstrapper');

bootstrap(app, {}, () => {
  app.listen(3001, () => {});
});
