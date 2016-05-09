# express-bootstrap-middleware

## Prerequisites
- Create folder `middleware` in app-root
- (optional) To load the middleware in order you have to provide a JSON configuration named `middleware.json` in app-root

## Usage
```
'use strict';

let express = require('express');
let app = express();
let bootstrap = require('express-bootstrap-middleware');
const PORT = 3000;

bootstrap(app, function() {
  app.listen(PORT, function() {
    console.log(`App is listening on http://localhost:${PORT}`);
  });
});
```
