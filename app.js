/*
 * app.js
 * Copyright (C) 2016 rmad <rmad@Vostro-3446>
 *
 * Distributed under terms of the MIT license.
 */
 var express = require('express');
 var app = express();
 app.use(express.static(__dirname + '/app'));
 app.listen(process.env.PORT || 3000);
