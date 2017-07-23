portalApp.applications.controller('ApplicationsController', ['CacheAPIService', '$scope','$stateParams', 'ApplicationService', function (CacheAPIService, $scope, $stateParams, ApplicationService) {
	var getData = null;
	if (User.role == 1) {
		getData = ApplicationService.fetchMyApplications(User.id);
	}
	else {
		getData = ApplicationService.fetchClientsApplications(User.id);
	}
	getData.then(function(data) {
		$scope.applications = data.data;
	}, function(err) {
		console.log('Error occured!, err=', err);
	});
	$scope.shortlistCandidate = function(appln) {
		ApplicationService.shortlistCandidate(appln.JobPost.id,	appln.User.id).then(function(data) {
			appln.isShortlisted = data.data.isShortlisted;
		},function(err) {
			console.log("Error occured, err=", err);
		});
	}
}]);
