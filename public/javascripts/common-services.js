portalApp.factory('httpInterceptor', ['StatusMessageService', function(StatusMessageService) {
	return {
		request: function(config) {
			return config;
		},
		requestError: function(config) {
			return config;
		},
		response: function(res) {
			return res;
		},
		responseError: function(res) {
			StatusMessageService.showErrorMessage(res.statusText, res);
			return res;
		}
	}
}]);

portalApp.factory('CacheAPIService', ['$http', function ($http) {
	var cache = {};
	return {
		get: function(api) {
			if(angular.isDefined(cache[api])) {
				console.log('Serving ',api,' request from cache');
				return cache[api];
			}
			else {
				cache[api] = $http.get(baseApi+api);
				return cache[api];
			}
		},
		delete: function(api) {
			delete cache[api];
		}
	}
}]);

portalApp.factory('StatusMessageService', ['$rootScope', '$timeout', function($rootScope, $timeout) {
	var statusMessage = {};
	return {
		showSuccessMessage: function(message, method, api, data) {
			statusMessage.message = message;
			statusMessage.class = 'alert-success';
			$rootScope.statusMessage = statusMessage;
			$timeout(function() {
				delete $rootScope.statusMessage;
			}, 2500);
		},
		showErrorMessage: function(message , response) {
			statusMessage.message = message || 'Error Occured';
			statusMessage.class = 'alert-danger';
			$rootScope.statusMessage = statusMessage;
			$timeout(function() {
				delete $rootScope.statusMessage;
			}, 2000);
		}
	}
}]);

portalApp.factory('ApplicationService', ['$http', function($http) {
	var applicationsAPI = baseApi + 'jobs/applications/';
	return {
		applyForThisJob: function(jobPost, user) {
			var applicationData = {
				JobPost: jobPost,
				User: user
			}
			return $http.post(applicationsAPI+'apply/'+jobPost.id, applicationData);
		},
		fetchMyApplications: function(userId) {
			return $http.get(applicationsAPI+'user/'+userId);
		},
		fetchThisJobPostApplications: function(postId) {
			return $http.get(applicationsAPI+'post/'+postId);
		},
		fetchClientsApplications: function(clientId) {
			return $http.get(applicationsAPI+'client/'+clientId);
		},
		shortlistCandidate: function(postId, candidateId) {
			return $http.put(applicationsAPI+'shortlist/post/'+postId+'/candidate/'+candidateId);
		}
	}
}]);
