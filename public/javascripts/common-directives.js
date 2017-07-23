portalApp.directive('preloader', [function() {
	return {
		restrict: 'E',
		template: 'Loading...'
	}
}]);

portalApp.directive('ifEmpty', [function() {
	return {
		restrict: 'A',
		transclude: true,
		scope: {
			ifEmpty: '=',
		},
		template: 	'<div class="clr center align-preloader" ng-if="loading">'+
						'<preloader></preloader>'+
					'</div>'+
					'<div class="text-center" ng-if="empty && !loading">'+
						'<h4 class="mrgtb10"> {{message}} </h4>'+
					'</div>'+
					'<ng-transclude ng-if="!empty && !loading"></ng-transclude>',
		link: function(scope, element, attributes) {
			scope.$watch('ifEmpty', function() {
				if(angular.isDefined(scope.ifEmpty)) {
					scope.empty = (scope.ifEmpty.length === 0);
					scope.loading = false;
				} else {
					scope.empty = true;
					scope.loading = true;
				}
			}, true);

			scope.message = (attributes.message)?attributes.message:'No Data available.'
			element.on("$destroy",function() {
				scope.$destroy();
 			});
		}
	}
}]);
