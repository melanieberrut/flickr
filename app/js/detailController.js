'use strict';

angular.module('potato')
	.controller('detailController', ['$scope', '$http', '$routeParams', function ($scope, $http ,$routeParams) {

	$scope.dataFetch = true;

	$http
	.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK')
  	.success(function(data){
  		// If we get some results back successfully, log in in variable that 
  		// will be used in the HTML to know what information to show
  		$scope.data = data;
  		$scope.dataFetch = true;

  		// Store all results in this variable
		$scope.items = $scope.data.items;

		// Item selected from listing view is parse in the routeParams
		// get the value
		$scope.whichItem = $routeParams.itemId;

		// Within the results array, locate that item and save it
		$scope.itemSelected = $scope.items[$scope.whichItem];

		// Store the tag string
		$scope.allTags = $scope.itemSelected.tags;
		var string = $scope.allTags;
		// Create a array for all the tags
		$scope.tags = string.split(" ");

	}).error(function(){
		// If we get some results back successfully
		$scope.dataFetch = false;
		console.info('Error, please try later');
	});


}]);