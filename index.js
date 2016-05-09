'use strict';

let express = require('express');
let app = express();
let bootstrap = require('./lib/bootstrap');
const PORT = 3000;

bootstrap(app, function() {
  app.listen(PORT, function() {
    console.log(`App is listening on http://localhost:${PORT}`);
  });
});
