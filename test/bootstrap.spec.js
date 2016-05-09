'use strict';

const path = require('path');
process.env.APP_ROOT = path.join(__dirname, '..', 'example');
let expect = require('chai').expect;
let app = require('../example/app.js').app;

describe('bootstrap', function() {

  it('bla', function() {
    console.log(app);
    expect(true).to.be.true;
  });

  afterEach(function() {
    app.close();
  });

});
