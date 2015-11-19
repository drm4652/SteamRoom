	//factory to assist in making a reservation on submission
	angular.module('reservationService1', [])
	.factory('Reservations1', ['$http', function($http){
		return {
			create: function(data){
				return $http.post('/reservationCheck', data);
			}
		}
	}]);
	
	
	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute', 'reservationService1']);
	var globalMessage = '';
	/*
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
	*/
	
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
			})
			
			.when('/myReservation', {
				templateUrl : 'myReservation.html',
				controller  : 'myReservationController'
			})
			
			.when('/confirm',{
				templateUrl : 'confirm.html',
				controller  : 'confirmController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', ['$scope', '$http', 'Reservations1',function($scope, $http, Reservations1) {
		// create a message to display in our 

		var globalDate = localStorage.getItem("globalDate");
		var globalTime = localStorage.getItem("globalTime");
		var globalTimePlus = globalTime * 1 + 1;
		var globalTimeOver = 0;
		var dateString = "";
		if(globalTime > 12){
			dateString = globalDate + 'T' + globalTime + ':00:00';
			globalTime = globalTime - 12;
			globalTimeOver = globalTime + 1;
			globalTime = globalTime + 'pm' + ' - ' + globalTimeOver + 'pm';
		}
		else if(globalTime == 10){
			dateString = dateString = globalDate + 'T' + globalTime + ':00:00';
			globalTime = globalTime + 'am' + ' - ' + globalTimePlus + 'am';
		}
		else if(globalTime == 11){
			dateString = dateString = globalDate + 'T' + globalTime + ':00:00';
			globalTime = globalTime + 'am' + ' - ' + globalTimePlus + 'pm';
		}
		else if(globalTime == 12){
			dateString = globalDate + 'T' + globalTime + ':00:00';
			globalTime = globalTime + 'pm' + ' - ' + '1pm';
		}		
		else{
			dateString = globalDate + 'T0' + globalTime + ':00:00';
			globalTime = globalTime + 'am' + ' - ' + globalTimePlus + 'am';
		}
		$http.resDate = new Date(dateString);
		console.log($http.resDate);
		globalMessage = globalDate + ' @ ' + globalTime
		$scope.message = globalMessage;

		$scope.doTheBack = function($scope){
			window.history.back();
			$('#test').fullCalendar( 'changeView', 'agendaDay' );
			$('#test').fullCalendar( 'gotoDate', date.format());
		};
		
		$scope.makeReservation = function(){
			$scope.loading = true;
			Reservations1.create({resDate: $http.resDate})
				.then(function(data){
					$scope.loading = false;
					$scope.reservations = data;
					//return $scope.reservations;
				});
		};
	}]);

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});
	
	scotchApp.controller('myReservationController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

	scotchApp.controller('confirmController', function($scope) {
		$scope.message = 'Your reservation on ' + globalMessage + ' has been accepted';
	});
	
	scotchApp.controller('settingsController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});