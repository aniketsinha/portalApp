'use strict'

portalApp.config(['$stateProvider', '$urlRouterProvider' ,function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.when('', '/login');//NO I18N
	$stateProvider.state('client', {
		url:'/client',
		templateUrl: '/templates/client.html',
		controller: 'ClientController',
	});

	$stateProvider.state('jobs', {
		url:'/jobs',
		templateUrl: '/templates/jobs.html',
		controller: 'JobsController',
	});

	$stateProvider.state('jobdetails', {
		url:'/jobs/details/:id',
		params: {
			details: null
		},
		templateUrl: '/templates/job-details.html',
		controller: 'JobDetailsController',
	});
	$stateProvider.state('company', {
		url:'/company/:id',
		templateUrl: '/templates/company.html',
		controller: 'CompanyController',
	});

	$stateProvider.state('search', {
		url:'/search?keyword',
		templateUrl: '/templates/search.html',
		controller: 'SearchController',
	});

	$stateProvider.state('login', {
		url:'/login',
		templateUrl: '/templates/login.html',
		controller: 'LoginController',
	});

	$stateProvider.state('applications', {
		url:'/applications',
		templateUrl: '/templates/applications.html',
		controller: 'ApplicationsController',
	});

}]);
