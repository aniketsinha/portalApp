var express = require('express');
var applicationsutil = express.Router();
var Application = require('../classes/application')

let allApplications = [];

function getApplicationDetails(id) {
	for(var i=0;i<allApplications.length;i++) {
		if(allApplications[i].id === id) {
			return allApplications[i];
		}
	}
}
function searchApplication(keyword) {
	let result = Util.findKeywordInCollection(keyword, allApplications);
	return result;
}
function checkIfAlreadyApplied(ap) {
	for(var i=0;i<allApplications.length;i++) {
		let iter = allApplications[i];
		if(iter.JobPost.id === ap.JobPost.id && iter.User.id === ap.User.id) {
			return {applied: true, Application: iter};
		}
	}
	return {applied: false};
}
function createNewApplication(formData) {
	var newApplication = new Application(allApplications.length,formData.JobPost, formData.User, new Date(), false, false);
	let alreadyApplied = checkIfAlreadyApplied(newApplication);
	
	if( !alreadyApplied.applied) {
		allApplications.push(newApplication);
		alreadyApplied.Application = newApplication;
		return alreadyApplied;
	}else {
		return alreadyApplied;
	}
}
function getThisUsersApplications(userId) {
	let userApplications = [];
	allApplications.forEach(function(ap) {
		if(ap.User.id === userId) {
			userApplications.push(ap);
		}
	});
	return userApplications;
}
function getThisClientsApplications(clientUserId) {
	let clientApplications = [];
	allApplications.forEach(function(ap) {
		if(ap.JobPost.createdBy.id === clientUserId) {
			clientApplications.push(ap);
		}
	});
	return clientApplications;
}
function getApplicationsForThisPost(postId) {
	let postApplications = [];
	allApplications.forEach(function(ap) {
		if(ap.JobPost.id === postId) {
			postApplications.push(ap);
		}
	});
	return postApplications;
}
function shortlistCandidate(postId, candidateId) {
	for(var i=0;i<allApplications.length;i++) {
		let ap = allApplications[i];
		if(ap.JobPost.id === postId && candidateId === ap.User.id) {
			ap.isViewedByHR = true;
			ap.isShortlisted = true;
			return ap;
		}
	}
}

//POST APIs
applicationsutil.post('/apply/:id', function(req, res, next) {
	let newAppln = createNewApplication(req.body);
	var respObj = null;
	if(!newAppln.applied) {
		respObj = {
			"code": 200,
			"message":"You applied for "+newAppln.Application.JobPost.title+ " at " + newAppln.Application.JobPost.Company.name ,
			"data": newAppln.Application
		}	
	}
	else {
		let appliedDate = new Date(newAppln.Application.appliedDate);
		var appliedDateString = appliedDate.getDate() + "/"+(appliedDate.getMonth()+1) + "/"+appliedDate.getFullYear() + ' ' + appliedDate.getHours() + ':'+ appliedDate.getMinutes();
		respObj = {
			"code": 409,
			"message":"You have already applied for "+newAppln.Application.JobPost.title+ " at " + newAppln.Application.JobPost.Company.name + ' on ' + appliedDateString,
			"data": newAppln.Application
		}
	}
	console.log('applicationsutil: respObj', respObj);
	res.json(respObj);
});
//GET APIs
applicationsutil.get('/', function(req, res, next) {
	res.json(allApplications);
});
applicationsutil.get('/user/:id', function(req, res, next) {
	let id = parseInt(req.params.id)
	let usersApplns = getThisUsersApplications(id)
	res.json(usersApplns);
});
applicationsutil.get('/client/:id', function(req, res, next) {
	let id = parseInt(req.params.id)
	let clientApplns = getThisClientsApplications(id);
	res.json(clientApplns);
});
applicationsutil.get('/post/:id', function(req, res, next) {
	let id = parseInt(req.params.id)
	let applicationsForThisPost = getApplicationsForThisPost(id);
	res.json(applicationsForThisPost);
});
applicationsutil.get('/search', function(req, res, next) {
	let userQuery = req.query;
	let searchResult = searchApplication(userQuery)
	res.json(searchResult);
});

applicationsutil.get('/:id', function(req, res, next) {
	let id = parseInt(req.params.id);
	var queriedApplication = getApplicationDetails(id);
	if(queriedApplication) {
		res.json(queriedApplication);
	}
	else {
		let notFoundObj = Constants.ErrorMessages.NOT_FOUND;
		res.status(notFoundObj.code).send(notFoundObj);
	}
});
applicationsutil.put('/shortlist/post/:postid/candidate/:candidateid', function(req, res, next) {
	let postid = parseInt(req.params.postid)
	let candidateid = parseInt(req.params.candidateid)
	let updatedPost = shortlistCandidate(postid,candidateid);
	res.json(updatedPost);
});

module.exports = applicationsutil;
