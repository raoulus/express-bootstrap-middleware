# express-bootstrapper

This library lets you bootstrap your express application. By providing a configuration file you can keep your `app.js` clean and the bootstrapper will require the modules.

### Configuration structure
Root element called bootstrap contains an array of Strings and/or Objects.
```json
{
  "bootstrap": [Object, String]
}
```

### Example `bootstrap.json`
This is the order of the files which are loaded `middleware/routes.js`, `middleware/bodyparser.js` and `bootstrap/server.js`
```
{
  "bootstrap": [
    {
      "middleware": [
        "routes",
        "bodyparser"
      ]
    },
    "server"
  ]
}
```

### Usage
```
'use strict';

let express = require('express');
let app = express();
let bootstrap = require('express-bootstrapper');

bootstrap(app, {bootstrap: 'bootstrap'}, () => {});

```
