const express = require('express');
const path = require('path');
const less = require('less-middleware');
const pdf = require('pdf-fill-form');
const fs = require('fs');

const formName = path.join(__dirname, '../content/i589ApplicationForAsylum.pdf');

const app = require('./server.js');

const routes = require('./routes.js');

routes(app);

const server = app.listen(app.get('port'), () => {
  console.log("...listening...");
});
