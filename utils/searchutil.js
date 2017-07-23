var express = require('express');
var searchutil = express.Router();
var companyutil = require('../utils/companyutil')
var alljobsutil = require('../utils/alljobsutil')
var jobpost = require('../classes/jobpost')

searchutil.get('/', function(req, res, next) {
	let results = {
		"jobs": [],
		"companies": []
	}
	let keyword = req.query.keyword;
	let jobs = alljobsutil.searchJobPost(keyword);
	let companies = companyutil.searchCompanies(keyword);
	results.jobs = jobs;
	results.companies = companies;
	res.json(results);
});

module.exports = searchutil;
