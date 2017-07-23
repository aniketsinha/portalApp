var express = require('express');
var companyutil = express.Router();
var Util = require('../utils/util')
var CacheUtil = require('../utils/cacheutil')
var Company = require('../classes/company')
var Constants = require('../classes/constants')

var companyCache = new CacheUtil();


//dummy data
let apple = new Company(1,'Apple Inc.','Computers', 'Tim Cook', 'Cupertino, California', "1976", 'Apple Inc. is an American multinational technology company headquarted in Cupertino, California that designs, develops and sells consumer electronics, computer software and online services.', '116,000', '215.6 billion USD');
let hdfc = new Company(2,'HDFC Bank','Banking', 'Aditya Puri', 'Mumbai, India', "August, 1994", 'HDFC Bank Limited is an Indian banking and financial services company.' , '84,325', '743.7 billion INR');
let gmr = new Company(3,'GMR Infrastructure Ltd','Infrastructure', 'Grandhi Mallikarjuna Rao', 'Bengaluru, Karnataka', '1978', 'GMR Group is an infrastructural company headquarterd in Bengaluru.', '10,000', '133.57 billion INR');
let dominos = new Company(4,'Dominos','Restaurant', 'J. Patrick Doyle', 'Ann Arbor Charter Township, Michigan, USA', '10 June 1960', 'Domino\'s Pizza Inc. is a large American pizza restaurant chain founded in 1960. The corporation is headquartered at the Domino\'s Farms Office Park in Ann Arbor, Michigan, United States', '260,000', 'US$2.47 billion');
var allCompanies = [apple, hdfc, gmr, dominos];

function getCompanyDetails(id) {
	for(var i=0;i<allCompanies.length;i++) {
		if(allCompanies[i].id === id) {
			return allCompanies[i];
		}
	}
}

function searchCompanies(keyword) {
	let result = Util.findKeywordInCollection(keyword, allCompanies);
	return result;
}

//APIs
companyutil.get('/', function(req, res, next) {
	res.json(allCompanies);
});

companyutil.get('/:id', function(req, res, next) {
	//Since company information dont change often, look in cache first
	let keyForCache = req.originalUrl;
	var dataToSend;
	var cachedData = companyCache.get(keyForCache);
	if(cachedData) {
		dataToSend = cachedData;
		console.log("COMPANY: served", keyForCache, ' from cache');
	}
	else {
		let id = parseInt(req.params.id);
		let queriedCompany = getCompanyDetails(id);
		if(queriedCompany) {
			companyCache.set(keyForCache,queriedCompany);
			dataToSend = queriedCompany;
		}
		else {
			let notFoundObj = Constants.ErrorMessages.NOT_FOUND;
			res.status(notFoundObj.code).send(notFoundObj);
			return;
		}
	}
	res.json(dataToSend);
});

companyutil.allCompanies = allCompanies;
companyutil.Company = Company;
companyutil.getCompanyDetails = getCompanyDetails;
companyutil.searchCompanies = searchCompanies;
module.exports = companyutil;
