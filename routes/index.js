var express = require('express');
var router = express.Router();
var Constants = require('../utils/constants')
var Candidate = require('../classes/candidate')
var Company = require('../classes/company')
var companyutil = require('../utils/companyutil')
var fs = require('fs');

const isDev = process.env.development;
const isProd = !isDev;
console.log('index.js: isDev', isDev, 'isProd', !isDev);

if(!isProd) {
	var cf = fs.readFileSync('clientfiles.txt', "utf8");
	var clientfiles = cf.toString().split("\n");
	var devFilePath = [];
	for(var i=0;i<clientfiles.length;i++) {
		devFilePath.push('/javascripts/'+clientfiles[i]);
	}
}
let zoho = new Company(6,'ZOHO Corporation Pvt. Ltd.','Computer Software, Cloud Software', 'Sridhar Vembu', 'Pleasanton, California, USA', 1996, 'ZOHO Corporation is the parent company behind 3 brands, WebNMS, ManageEngine and Zoho.', 5000, 'Undisclosed');
companyutil.allCompanies.push(zoho);
let loggedInUser = new Candidate(1, 'Aniket','3.5 years', zoho, 'NA', ['Java','JavaScript','AngularJS', 'HTML', 'CSS'], undefined, undefined, ['B.Tech, VIT Univerity, Vellore'], 30 );
loggedInUser.role = Constants.Roles.USER;
// console.log('loggedInUser = ', loggedInUser);
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: 'Job Portal',
  	username: loggedInUser.name,
  	isProd: isProd,
  	user: loggedInUser,
  	devfiles: devFilePath
  });
});
module.exports = router;
