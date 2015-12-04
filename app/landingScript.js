	// create the module and name it scotchApp
//var calendarDemoApp = angular.module('calenderDemoApp', ['ui.bootstrap'])
	
 

var scotchApp = angular.module('scotchApp', ['ngRoute', 'ui.bootstrap'])


	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'landing.html',
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
			
			.when('/find', {
				 templateUrl : 'find.html',
				 controller  : 'findController'
			})
			
			.when('/myReservation', {
				templateUrl : 'myReservation.html',
				controller  : 'myReservationController'
			});
			/*
			.when('/confirm',{
				templateUrl : 'confirm.html',
				controller  : 'confirmController'
			});*/
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
		
		$scope.doTheBack = function($scope){
			window.history.back();
		
		};
		// create a message to display in our 
		$scope.message = 'Would you like reserve a room or search your reservations?';		
	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});
	
	scotchApp.controller('myReservationController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});
	
	scotchApp.controller('settingsController', function($scope) {
		$scope.message = 'Your account settings';
	});

	scotchApp.controller('findController', function($scope) {
		$scope.message = 'Here is your reservations.';
			 $scope.oneAtATime = true;
$scope.date = 'dateTest';
$scope.time = 'timeTest';
$scope.room = 'roomTest';
   //$scope.items = ['Item 1', 'Item 2', 'Item 3'];
	/*
   $scope.addItem = function() {
     var newItemNo = $scope.items.length + 1;
     $scope.items.push('Item ' + newItemNo);
   };*/
	});