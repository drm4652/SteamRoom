var mongoose = require('mongoose');

var resSchema = new mongoose.Schema({
	reserver : String,
	reservedAs : String,
	date : Date,
	checkedIn : Boolean,
	checkedOut : Boolean,
	roomNumber : Number,
	dateRoom : {type : String, index: {unique: true}}
});

module.exports = mongoose.model('Reservation', resSchema);