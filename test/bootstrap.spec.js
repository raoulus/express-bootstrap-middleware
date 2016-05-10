'use strict';

let expect = require('chai').expect;
let express = require('express');
let app = express();
let bootstrap = require('../lib/bootstrap');

bootstrap(app, {bootstrap: 'bootstrap'}, () => {
  //
});
// prepare dummy config
// create test app
// do assertions
