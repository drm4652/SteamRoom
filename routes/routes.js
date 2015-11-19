var Reservation = require('./models/reservationModel.js');
var User = require('./models/userModel.js');
var path = require('path');

//Returns number current user's current reservations
function getReservations(req, res) {
	Reservation.find(
	{ 'username': req.session.username },
	function(err, reservations) {
		if(err) {
			res.send(err);
		}
		res.json(reservations);
	});
};

//get list of permission classes for user
function getPermissionClasses(req, res) {
	User.find(
	{ 'username': req.session.username},
	function(err, user) {
		if(err) {
			res.send(err);
		}
		res.json(user.permissionClasses);
	});
};

//Returns the number of rooms available at a certain time
function getNumOfReservations(req, res) {
	//TODO add room number checking for teleconference and phoneline
	//console.log(req.body.dateCheck);
	Reservation.find( 
	{'date': req.body.dateCheck},
	function(err, reservations) {
		if(err) {
			console.log('some kind of error');
			res.send(err);
		}
		console.log(reservations.length);
		//console.log(JSON.stringify(reservations, null, 4));
		res.json(reservations.length);
	});
};

//Returns list of currently unused rooms
function getAvailableRooms(req, res) {
	
};

module.exports = function(app) {
	//declare session variable to store session data
	var sesh;
	
	//will render login page when no username is in session
	app.get('/', function(req, res) {
		//res.send('hello world');
		sesh = req.session;
		if(sesh.username) {
			res.redirect('/landing');
		}
		else {
			res.sendFile(path.join(__dirname + '/../app/index.html'));
		}
	});
	
	//assigns the usename to sesh.username in order to log in
	//the username is obtained from the 
	app.post('/login', function(req, res) {
		sesh = req.session;
		sesh.username=req.body.username;
		console.log(sesh.username);
		res.end('done');
	});
	
	//If there is session data then the user is sent
	//to the landing.html page
	app.get('/landing', function(req, res) {
		sesh = req.session;
		if(sesh.username) {
			res.sendFile(path.join(__dirname + '/../app/landingIndex.html'));
			console.log(sesh.username);
		}
		else {
			res.redirect('/');
		}
	});
	
	//load calendar page
	app.get('/calendar', function(req, res) {
		res.sendFile(path.join(__dirname + '/../calendar/index.html'));
	});
	
	//get all of the current user's reservations
/* 	app.post('/calendar', function(req, res) {
		//use mongoose to get current user's reservations in database
		getReservations(req, res);
	}); */
	
	//get number of reservations for a certain time
	app.post('/calendar', function(req, res) {
		//use mongoose to get the number of open rooms for each hour listed
		getNumOfReservations(req, res);
	})
	
	//load reservation information page before comfirming to make a reservation
	app.get('/reservationCheck', function(req, res) {
		res.sendFile(path.join(__dirname + '/../app/ReservationIndex.html'));
	});
	
	// create a reservation with confirm button
	app.post('/reservationCheck', function(req, res) {
		//create a reservation, information comes from AJAX request from Angular
		sesh = req.session;
		console.log(req.body.resDate);
		Reservation.create({
			reserver : sesh.username,
			reservedAs : 3,
			date : req.body.resDate,
			checkedIn: false,
			checkedOut: false,
			roomNumber: 1664
		}, function(err, reservation) {
			if(err) {
				res.send(err);
			}
		});
	});
	
	//delete a reservation
	app.delete('/api/myReservations/:reserver_id', function(req, res) {
		Reservation.remove({
			_id : req.params.reservation_id
		}, function(err, todo) {
			if(err) {
				res.send(err);
			}
			getReservations(req, res);
		});
	});
	
	//application
	// app.get('*', function(req, res) {
		// res.sendfile('./views/listReservations.html'); // load the single view file
	// });
};