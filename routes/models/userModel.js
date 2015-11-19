var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username : String,
	teams: [String],
	PermissionClasses: [String]
});

module.exports = mongoose.model('User', userSchema);