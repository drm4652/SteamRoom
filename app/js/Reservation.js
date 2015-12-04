var Reservation = function (user, status, type, date, duration, roomNum, error) {
  this.user = user;
  this.status = status;
  this.type = type;
  this.date = date;
  this.duration = duration;
  this.roomNum = roomNum;
  this.error = "Unspecified Conflict";
};
