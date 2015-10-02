var app = angular.module('myReservations', ['ngAnimate', 'ui.bootstrap']);

app.controller('accordionCtrl', function ($scope, $http) {
  //var parent = angular.element('#myResAccordion');

  $scope.oneAtATime = true;
  $scope.groups = [];
  $scope.username = '';
  $scope.cords = [{head: "I'm here", val: "me too"}];
  $scope.num = 1;


  $scope.getReservations = function() {
    
      var reservations = Reservations.listReservations('naw7961');
      for (var reservation in reservations) {
        var res = {
          title: reservation.date,
          content: reservation.roomNumber
        };
        $scope.groups.push(res);
      }
    
    return $scope.groups;
  }();

  $scope.addAccordion = function() {
    $scope.cords.push({head: $scope.num, val: "hi"});
    $scope.num++;
  };

  $scope.check = function() {};

  $scope.cancel = function() {};

  $scope.alert = function() {};

});