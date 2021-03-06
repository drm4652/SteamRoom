	//factory to assist in making a reservation on submission
	angular.module('reservationService1', [])
	.factory('Reservations1', ['$http', function($http){
		return {
			create: function(data){
				return $http.post('/reservationCheck', data);
			},
			grab: function(data){
				return $http.get('../api/myReservations', data);
			},
			delete: function(id) {
				return $http.delete('../api/myReservations/' + id);
			}
		}
	}]);
	
	
	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute', 'ui.bootstrap', 'reservationService1']);
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
				templateUrl : 'roomInfo.html',
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
		globalTime = parseInt(globalTime);
		console.log(globalTime);
		console.log(globalDate);
		var globalTimePlus = globalTime * 1 + 1;
		var globalTimeOver = 0;
		var dateString = "";
		var localTime = globalTime + 5;
		var localDate = globalDate;
		if (localTime >= 24) {
			localTime = localTime - 24
			newDate = new Date(globalDate);
			localYear = newDate.getFullYear();
			localMonth = newDate.getMonth()+1;
			localDay = newDate.getDate()+2;
			console.log(localDay);
			localDate = localYear + '-' + localMonth + '-' + localDay;
			console.log(globalDate);
		}
		if(localTime > 9){
			dateString = localDate + 'T' + localTime + ':00:00';
			console.log(dateString);
		}
		else{
			dateString = localDate + 'T0' + localTime + ':00:00';
			console.log(dateString);
		}
		if(globalTime > 12){
			globalTime = globalTime - 12;
			globalTimeOver = globalTime + 1;
			globalTime = globalTime + 'pm' + ' - ' + globalTimeOver + 'pm';
		}
		else if(globalTime == 10){
			globalTime = globalTime + 'am' + ' - ' + globalTimePlus + 'am';
		}
		else if(globalTime == 11){
			globalTime = globalTime + 'am' + ' - ' + globalTimePlus + 'pm';
		}
		else if(globalTime == 12){
			globalTime = globalTime + 'pm' + ' - ' + '1pm';
		}		
		else{
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
		
		$http.roomType = "none";
		
		$scope.phoneSelect = function() {
			$http.roomType = "phone";
		}
		$scope.webCamSelect = function() {
			$http.roomType = "camera";
		}
		$scope.defaultSelect = function() {
			$http.roomType = "none";
		}
		
		$scope.makeReservation = function(){
			$scope.loading = true;
			Reservations1.create({resDate: $http.resDate, roomOption: $http.roomType})
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
	
	scotchApp.controller('findController', function($route, $scope, Reservations1) {
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
			Reservations1.grab()
				.then(function(data){
					$scope.loading = false;
					$scope.groups = [];
					$scope.reservations = data.data;
					//console.log($scope.reservations);
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
		
		Reservations1.delete(id)
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
	
	scotchApp.controller('confirmController', function($scope) {
		$scope.message = 'Your reservation on ' + globalMessage + ' has been accepted';
	});
	
	scotchApp.controller('settingsController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});