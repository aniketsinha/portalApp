portalApp.jobs.controller('JobsController', ['$http', '$scope', 'ApplicationService', 'StatusMessageService', function ($http, $scope, ApplicationService, StatusMessageService) {
	$http.get(baseApi+'jobs').then(function(resp) {
		$scope.allJobs = resp.data;
	}, function(err) {
		console.log('err occured', err)
	});

	$scope.applyForThisJob = function(jd) {
		ApplicationService.applyForThisJob(jd, User).then(function(data) {
			if(data.data.code === 200) {
				StatusMessageService.showSuccessMessage(data.data.message);
			} else {
				StatusMessageService.showErrorMessage(data.data.message);
			}
			jd.applied = true;
		}, function(err) {
			console.log('Error Occured, error = ', err)
		});
	};


}]);

portalApp.jobs.controller('JobDetailsController', ['CacheAPIService', '$scope','$stateParams', 'ApplicationService', 'StatusMessageService', function (CacheAPIService, $scope, $stateParams, ApplicationService, StatusMessageService) {
	if($stateParams.details) {
		$scope.details = $stateParams.details;
	}
	else {
		CacheAPIService.get('jobs/'+$stateParams.id).then(function(resp) {
			$scope.details = resp.data;
		}, function(err) {
			console.log('err occured', err)
		});
	}

	$scope.applyForThisJob = function() {
		ApplicationService.applyForThisJob($scope.details, User).then(function(data) {
			if(data.data.code === 200) {
				StatusMessageService.showSuccessMessage(data.data.message);
			} else {
				StatusMessageService.showErrorMessage(data.data.message);
			}
			$scope.details.applied = true;
		}, function(err) {
			console.log('Error Occured, error = ', err)
		});
	};
}]);
