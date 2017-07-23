portalApp.controller('MainController', ['$scope', '$state', function ($scope, $state) {
	$scope.stateName = $state.current.name;
	$scope.handleSearch = function() {
		if($scope.search) {
			$state.go('search',{"keyword":$scope.search});
		}
	};
}]);

portalApp.controller('LoginController', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {
	$scope.loginAs = function(role) {
		$rootScope.isLoggedIn = true;
		User.role = role;
		if(User.role === 2) {
			$state.go('client');
			User.name = $scope.originalUserName + " HR";
		}
		else {
			$state.go('jobs');
			User.name = $scope.originalUserName;
		}
	};
}]);
