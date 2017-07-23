var express = require('express');
var alljobsutil = express.Router();
var companyutil = require('../utils/companyutil')
var Util = require('../utils/util')
var applicationsutil = require('../utils/applicationsutil')
var Company = require('../classes/company')
var JobPost = require('../classes/jobpost')
var Constants = require('../classes/constants')
var Candidate = require('../classes/candidate')


let flipkart = new Company(5,'Flipkart','E Commerce', 'Kalyan Krishnamurthy', 'Bengaluru, India', '5 September 2007', 'Flipkart is an electronic commerce company headquartered in Bangalore, Karnataka. It was founded in October 2007 by Sachin Bansal and Binny Bansal.', '30,000', '15,129 crore INR(US$2.3 billion)');
companyutil.allCompanies.push(flipkart);

let dummyHR1 = new Candidate(10, 'Mr. HR','10 years', flipkart, 'NA', ['Hiring'], undefined, undefined, ['MBA, IIM Ahmedabad', 'B.Tech, IIT Kanpur'], 30 );
let dummyHR2 = new Candidate(11, 'Mrs. HR','10 years', companyutil.allCompanies[1], 'NA', ['Hiring'], undefined, undefined, ['MBA, IIM Bangalore', 'B.Tech, IIT Delhi'], 30 );

let demoJob1 = new JobPost(1,'Delivery Boy', new Date(), dummyHR1, 'Delivery, Courier', ['Graduate', '10th'], "Very good in local language and able to read maps or ask for directions on phone.", "Noida",Constants.StatusCodes.OPEN, ["Delivery", "Courier"], flipkart);
let demoJob2 = new JobPost(2,'Civil Engineer', new Date(), dummyHR2, 'Infrastructure', ['B.Tech'], "Looking for very good Civil Engineer with experience of building Airports", "Bengaluru",Constants.StatusCodes.OPEN, ["Construction", "Airport", "Civil"], companyutil.allCompanies[2]);
let allJobPosts = [demoJob1, demoJob2];


function getJobPostDetails(id) {
	for(var i=0;i<allJobPosts.length;i++) {
		if(allJobPosts[i].id === id) {
			return allJobPosts[i];
		}
	}
}
function searchJobPost(keyword) {
	let result = Util.findKeywordInCollection(keyword, allJobPosts);
	return result;
}
function createNewJobPost(formData) {
	let newJobPost = new JobPost(allJobPosts.length, formData.title, new Date(), formData.createdBy, formData.domain, formData.education, formData.description, formData.location, formData.status, formData.keywords, formData.Company);
	allJobPosts.push(newJobPost);
	return newJobPost;
}

//POST API
alljobsutil.post('/', function(req, res, next) {
	let newJobPost = createNewJobPost(req.body);
	let createdObj = {
		"code": 200,
		"message":"Successfully added!",
		"data": newJobPost
	}
	res.json(createdObj);
});
//PUT API
// alljobsutil.put('/', function(req, res, next) {
// 	let updatedJobPost = updateJobPost();
// 	res.json(updatedJobPost);
// });
//GET API
alljobsutil.get('/', function(req, res, next) {
	res.json(allJobPosts);
});
alljobsutil.get('/search', function(req, res, next) {
	let userQuery = req.query;
	let searchResult = searchJobPost(userQuery)
	res.json(searchResult);
});
alljobsutil.use('/applications', applicationsutil);

alljobsutil.get('/:id', function(req, res, next) {
	let id = parseInt(req.params.id);
	var queriedJobPost = getJobPostDetails(id);
	if(queriedJobPost) {
		res.json(queriedJobPost);
	}
	else {
		let notFoundObj = Constants.ErrorMessages.NOT_FOUND;
		res.status(notFoundObj.code).send(notFoundObj);
	}
});


alljobsutil.allJobPosts = allJobPosts;
alljobsutil.searchJobPost = searchJobPost;
module.exports = alljobsutil;
