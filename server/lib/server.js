"use strict";

const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../public')));

module.exports = app;