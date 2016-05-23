# express-bootstrapper

---
[![GitHub build](https://travis-ci.org/raoulus/express-bootstrapper.svg?branch=master)]()
[![GitHub tag](https://img.shields.io/github/tag/raoulus/express-bootstrapper.svg)]()
[![GitHub license](https://img.shields.io/github/license/raoulus/express-bootstrapper.svg)]()

This modules lets you easily require a set of files (e.g. middlewares, libraries...) and will help you to keep your `app.js` clean. You only have to maintain a JSON configuration and the bootstrapper takes care that the items are loaded in the specified order. Inspired by [Loopback boot](https://docs.strongloop.com/display/public/LB/Defining+boot+scripts)

## Installation
tbd

## Usage
`app.js`
```javascript
'use strict';

let express = require('express');
let app = express();
let bootstrap = require('express-bootstrapper');
let bootstrapOpts = {};

bootstrap(app, bootstrapOpts, () => {
  app.listen(3000, () => {});
});
```

`bootstrap.json`
```json
{
  "bootstrap": [
    {
      "middleware": [
        "routes",
        "bodyparser"
      ]
    },
    "file_in_bootstrap_folder",
    "another_file_in_bootstrap_folder"
  ]
}
```
With this configuration the bootstrapper will first load the files `middleware/routes.js`, `middleware/bodyparser.js` and then `bootstrap/file_in_bootstrap_folder.js` and `bootstrap/another_file_in_bootstrap_folder.js`. 

## Options
|Name |Description|
|-----|-----|
|directory|Bootstrap directory. Files will be loaded in the order specified in the configuration. Default `bootstrap`.|
|configFileName|Bootstrap configuration filename. Default `bootstrap.json`.|
