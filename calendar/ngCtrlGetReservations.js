var app = angular.module('myReservations', ['ngAnimate', 'ui.bootstrap']);

app.controller('accordionCtrl', accordionCtrl);

function accordionCtrl() {
  this.oneAtATime = true;
  this.groups = [];
  this.username = '';
}

accordionCtrl.prototype.getReservations = function() {
  if (this.username) {
    var reservations = Reservations.listReservations.myReservations('naw7961');
    for (var reservation in reservations) {
      var res = {
        title: reservation.date,
        content: reservation.roomNumber
      };
      $scope.groups.push(res);
    }
  }
};

accordionCtrl.prototype.check = function() {};

accordionCtrl.prototype.cancel = function() {};

accordionCtrl.prototype.alert = function() {};
