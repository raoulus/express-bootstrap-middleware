'use strict';

const path = require('path');
let expect = require('chai').expect; // jshint ignore:line
let express = require('express');
let app = express();
let server;

describe('bootstrapper', function() {

  afterEach(function() {
    server.close();
    clearRequireCache();
  });

  describe('with config bootstrap.json', function() {

    let modules;
    let options = {
      configFileName: 'bootstrap.json'
    };

    beforeEach(function(done) {
      startServer(options, done);
      modules = Object.keys(require.cache);
    });

    it('loads route.js before the bodyparser.js as defined in the config', function() {
      let routes = path.resolve(`middleware/routes.js`);
      let bodyparser = path.resolve(`middleware/bodyparser.js`);
      expect(modules.indexOf(routes)).to.be.below(modules.indexOf(bodyparser));
    });

    it('loads whatever.js after the middlewares', function() {
      let routes = path.resolve(`middleware/routes.js`);
      let bodyparser = path.resolve(`middleware/bodyparser.js`);
      let whatever = path.resolve(`bootstrap/whatever.js`);
      expect(modules.indexOf(routes)).to.be.below(modules.indexOf(bodyparser));
      expect(modules.indexOf(whatever)).to.be.above(modules.indexOf(routes));
      expect(modules.indexOf(whatever)).to.be.above(modules.indexOf(bodyparser));
    });

  });

  describe('with config bootstrap.other.json', function() {

    let modules;
    let options = {
      configFileName: 'bootstrap.other.json'
    };

    beforeEach(function(done) {
      startServer(options, done);
      modules = Object.keys(require.cache);
    });

    it('loads bodyparser.js before the route.js as defined in the config', function() {
      let routes = path.resolve(`middleware/routes.js`);
      let bodyparser = path.resolve(`middleware/bodyparser.js`);
      expect(modules.indexOf(routes)).to.be.above(modules.indexOf(bodyparser));
    });

    it('loads whatever.js, whatever-2.js and then whatever-3.js', function() {
      let whatever = path.resolve(`bootstrap/whatever.js`);
      let whatever2 = path.resolve(`bootstrap/whatever-2.js`);
      let whatever3 = path.resolve(`bootstrap/whatever-3.js`);
      expect(modules.indexOf(whatever)).to.be.below(modules.indexOf(whatever3));
      expect(modules.indexOf(whatever)).to.be.below(modules.indexOf(whatever2));
      expect(modules.indexOf(whatever2)).to.be.below(modules.indexOf(whatever3));
    });

  });

  describe('with custom options', function() {

    let modules;
    let options = {
      directory: 'bootstrap-other',
      configFileName: 'bootstrap.other2.json'
    };

    beforeEach(function(done) {
      startServer(options, done);
      modules = Object.keys(require.cache);
    });

    it('can overwrite the bootstrap directory', function() {
      ['whatever-4.js', 'whatever-5.js', 'whatever-6.js'].forEach(function(filename) {
        let whatever = path.resolve(`${options.directory}/${filename}`);
        expect(modules.indexOf(whatever)).to.be.at.least(0);
      });
    });

  });

});

function startServer(options, done) {
  let bootstrap = require('../../express-bootstrapper');
  bootstrap(app, options, () => {
    server = app.listen(3001, () => {
      done();
    });
  });
}

function clearRequireCache() {
  Object.keys(require.cache).forEach(function(key) {
    delete require.cache[key];
  });
}
