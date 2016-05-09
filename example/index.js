'use strict';

let express = require('express');
let app = express();
let bootstrap = require('../lib/bootstrap');
const PORT = 3001;

bootstrap(app, () => {
  app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
  });
});
