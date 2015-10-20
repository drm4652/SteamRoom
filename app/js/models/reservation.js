var mongoose = require('mongoose');

var resSchema = new mongoose.Schema({
	reserver : String,
	reservedAs : String,
	date : Date,
	checkedIn : Boolean,
	checkedOut : Boolean
});

module.exports = mongoose.model('Reservation', resSchema);