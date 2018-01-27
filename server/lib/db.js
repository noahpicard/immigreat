"use strict";

const MongoClient = require('mongodb').MongoClient;
const async = require('async');

const MONGODB_URI = "mongodb://localhost:27017";

module.exports = async.apply(MongoClient.connect, MONGODB_URI);