	// create the module and name it scotchApp
//var calendarDemoApp = angular.module('calenderDemoApp', ['ui.bootstrap'])
	
 angular.module('myReservationService', [])
	.factory('grabReservations', ['$http', function($http){
		return {
			grab: function(data){
				return $http.get('../api/myReservations', data);
			},
			delete: function(id) {
				return $http.delete('../api/myReservations/' + id);
			}
		}
	}]);

var scotchApp = angular.module('scotchApp', ['ngRoute', 'ui.bootstrap', 'myReservationService'])


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

	scotchApp.controller('findController', function($scope, $route, grabReservations) {
		$scope.message = 'Here is your reservations.';
			 $scope.oneAtATime = true;
			var date = 'dateTest';
			var time = 'timeTest';
			var room = 'roomTest';
			var amountReservation = 4;
		$scope.addGroup = function(idx, group, e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    var newGroup = angular.copy(group);
    $scope.groups.splice(idx + 1, 0, newGroup);
  };
  
  $scope.removeGroup = function(idx, e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    $scope.groups.splice(idx, 1);
  };
  //make the amount of accordion based on how many in database

    $scope.listGroups = (function(cr) {
	  for(var i = 0; i < cr.length; i ++) { 
		$scope.groups.push(cr[i]);
	  }
	});
	
	$scope.getReservation = function(){
			$scope.loading = true;
			grabReservations.grab()
				.then(function(data){
					$scope.loading = false;
					$scope.groups = [];
					$scope.reservations = data.data;
					console.log($scope.reservations);
					$scope.listGroups($scope.reservations);
					//return $scope.reservations;
				});
		};
		
	$scope.getReservation();   

  
    $scope.checkIn = function() {
		//code goes here
		alert("check in");
	};
	$scope.checkOut = function() {
		//code goes here
		alert("check outed");
	};
	$scope.deleteReservation = function(id) {
		$scope.loading = true;
		
		grabReservations.delete(id)
			.success(function(data) {
				$scope.loading = false;
				$scope.reservations = data;
				$route.reload();
			});
	};
    
	$scope.alertAdmin = function(){
		//code goes here
	};
   //$scope.items = ['Item 1', 'Item 2', 'Item 3'];
	/*
   $scope.addItem = function() {
     var newItemNo = $scope.items.length + 1;
     $scope.items.push('Item ' + newItemNo);
   };*/
	});