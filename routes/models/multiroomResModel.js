var mongoose = require('mongoose');

var multiResSchema = new mongoose.Schema({
	multiRoomId : Number,
	reserver : String,
	reservedAs : String,
	date : Date,
	checkedIn : Boolean,
	checkedOut : Boolean,
	roomNumber: Number
});

module.exports = mongoose.model('MultiroomRes', resSchema);