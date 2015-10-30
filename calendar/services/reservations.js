angular.module('reservationService', [])

	.factory('Reservations', ['$http', function($http){
		return {
			get: function(){
				return $http.get('/api/currentDateRes');
			}
		}
	}]);