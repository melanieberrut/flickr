'use strict';

angular.module('potato')
	.controller('listingController', ['$scope', '$http', function ($scope, $http) {

	$scope.dataFetch = true;

	// Fetch the data from the API
	$http
	.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK')
  	.success(function(data){
  		// If we get some results back successfully, log in in variable that 
  		// will be used in the HTML to know what information to show
  		$scope.data = data;
  		$scope.dataFetch = true;

  		// Store all results in this variable
		$scope.items = $scope.data.items;

	}).error(function(){
		// If we get some results back successfully
		$scope.dataFetch = false;
		console.info('Error, please try later');
	});

}]);