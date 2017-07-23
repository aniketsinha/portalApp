portalApp.search.controller('SearchController', ['$http', '$scope','$stateParams', function ($http, $scope, $stateParams) {
	$http.get(baseApi+'search?keyword='+$stateParams.keyword).then(function(resp) {
		$scope.allJobs = resp.data.jobs;
		$scope.companies = resp.data.companies;
	}, function(err) {
		console.log('err occured', err)
	});
}]);
