var mongoose = require('mongoose');

var resSchema = new mongoose.Schema({
	reserver : String,
	reservedAs : Number,
	date : Date,
	checkedIn : Boolean,
	checkedOut : Boolean,
	roomNumber : Number
});

module.exports = mongoose.model('Reservation', resSchema);