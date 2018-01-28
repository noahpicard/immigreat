"use strict";

const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../published')));

app.use(express.static(path.join(__dirname, '../public')));
app.use(require('less-middleware')(path.join(__dirname, 'source', 'less'), {
  dest: path.join(__dirname, 'public'),
  options: {
    compiler: {
      compress: false,
    },
  },

  preprocess: {
    path: (pathname, req) => pathname.replace('/css/', '/'),
  },
  force: true,
}));

module.exports = app;
