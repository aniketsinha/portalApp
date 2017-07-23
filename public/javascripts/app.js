'use strict';
var portalApp = angular.module('portalApp',['ui.router', 'portalApp.client', 'portalApp.jobs', 'portalApp.company', 'portalApp.search', 'portalApp.applications']);
var baseApi = '/api/';

//Setting constants in rootScope
portalApp.run(['$rootScope', function($rootScope){
	$rootScope.User = User;
	$rootScope.originalUserName = User.name;
	$rootScope.isLoggedIn = false;
}]);

//Adding httpInterceptor
portalApp.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('httpInterceptor');
}]);

//prevent User with role!=2 with accessing client page. Redirect to login page.
portalApp.run(['$transitions', function($transitions) {
  $transitions.onStart({ to: 'client' }, function(trans) {
  	if(User.role !== 2) {
  		return trans.router.stateService.target('login');
  	}
  });
}]);
