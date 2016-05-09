# express-bootstrapper

## Prerequisites
- Create a JSON configuration named `bootstrap.json` in the root folder of your app

## Usage
```
'use strict';

let express = require('express');
let app = express();
let bootstrap = require('express-bootstrapper');

bootstrap(app, {bootstrap: 'bootstrap'}, () => {});

```
