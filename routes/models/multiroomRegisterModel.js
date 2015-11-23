var mongoose = require('mongoose');

var resSchema = new mongoose.Schema({
	multiRoomID : Number,
	reserver : String,
	numberOfRooms : Number,
	courseNumber : String,
	daysOfTheWeek : [String],
	phoneLine : Boolean,
	teleconference : Boolean,
	startDate : Date,
	endDate : Date
});

module.exports = mongoose.model('MultiroomRegister', resSchema);