portalApp.client.controller('ClientController', ['$scope', 'CacheAPIService', '$http', 'StatusMessageService', '$state', '$timeout', function ($scope, CacheAPIService, $http, StatusMessageService, $state, $timeout) {
	CacheAPIService.get('companies').then(function(companies){
		$scope.companies = companies.data;
		$scope.formData.Company = $scope.companies[4];
	});
	$scope.options = {
		education: ['B.Tech', 'MS', 'BCA', 'MCA', 'PHD'],
		status: [{id: 1, value: 'Open'}, {id: 2, value: 'Closed'}]
	}
	var now = new Date();
	now.setDate(now.getDate()+7);
	$scope.formData = {
		title: 'Member Technical Staff',
		createdBy: User,
		domain: 'Business Software | Cloud',
		education: ['B.Tech', 'MCA'],
		description: 'Full stack developer involved in all phases of development',
		location: 'Chennai',
		status: 1,
		keywords: ['SaaS', 'Cloud', 'Business', 'Software'],
		lastDate: now
	}
	$scope.submitForm = function() {
		handleKeywords();
		postData();
	};
	function handleKeywords() {		
		if(!($scope.formData.keywords instanceof Array)) {
			var allKeywords = $scope.formData.keywords.split(',');
			var final = [];
			for(var i=0; i<allKeywords.length;i++) {
				var iter = allKeywords[i];
				iter = iter.trim();
				final.push(iter);
			}
			$scope.formData.keywords = final;
		}
	};
	function postData() {
		$http.post(baseApi+'jobs', $scope.formData).then(function(data) {
			StatusMessageService.showSuccessMessage(data.data.message);
			$timeout(function() {$state.go('jobs');}, 500);			
		}, function(err) {
			console.log('ERROR: ', err)
		});
	}
}]);
