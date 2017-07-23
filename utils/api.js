var express = require('express');
var api = express.Router();
var alljobsutil = require('../utils/alljobsutil')
var companyutil = require('../utils/companyutil')
var searchutil = require('../utils/searchutil')


api.get('/', function(req, res, next) {
  res.send('Not a valid API endpoint');
});

api.use('/jobs', alljobsutil)
api.use('/companies', companyutil);
api.use('/search', searchutil);

module.exports = api;
