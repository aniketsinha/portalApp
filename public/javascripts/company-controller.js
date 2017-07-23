portalApp.company.controller('CompanyController', ['CacheAPIService', '$scope','$stateParams', function (CacheAPIService, $scope, $stateParams) {
	CacheAPIService.get('companies/'+$stateParams.id).then(function(resp) {
		$scope.company = resp.data;
	}, function(err) {
		console.log('err occured', err)
	});
	$scope.showJobsLink = true;
}]);
