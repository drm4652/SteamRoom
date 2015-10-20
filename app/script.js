	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);
function SearchCtrl($scope, $http) {
	$scope.url = 'search.php'; // The url of our search
		
	// The function that will be executed on button click (ng-click="search()")
	$scope.search = function() {
		
		// Create the http post request
		// the data holds the keywords
		// The request is a JSON request.
		$http.post($scope.url, { "data" : $scope.keywords}).
		success(function(data, status) {
			$scope.status = status;
			$scope.data = data;
			$scope.result = data; // Show result from server in our <pre></pre> element
		})
		.
		error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;			
		});
		
	};
}
	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'about.html',
				controller  : 'aboutController'
			})

			// route for the settings page
			.when('/settings', {
				templateUrl : 'settings.html',
				controller  : 'settingsController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
		// create a message to display in our 

		var globalDate = localStorage.getItem("globalDate");
		var globalTime = localStorage.getItem("globalTime");
		var globalTimePlus = globalTime * 1 + 1;
		var globalTimeOver = 0;
		if(globalTime > 12){
			globalTime = globalTime - 12;
			globalTimeOver = globalTime + 1;
			globalTime = globalTime + 'pm' + ' - ' + globalTimeOver + 'pm';
		}
		else if(globalTime == 12){
			globalTime = globalTime + 'am' + ' - ' + '1pm';
		}
		else{
			globalTime = globalTime + 'am' + ' - ' + globalTimePlus + 'am';
		}
		
		$scope.message = globalDate + ' @ ' + globalTime;

		
	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.alertMessage = 'Look! I am an about page.';
	});

	scotchApp.controller('settingsController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});