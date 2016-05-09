'use strict';

let express = require('express');
let app = express();
let bootstrap = require('../lib/bootstrap');

bootstrap(app, {bootstrap: 'bootstrap'}, () => {
  //
});

//module.exports = app;
