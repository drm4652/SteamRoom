var Reservation = require('./models/reservation');

//Returns number current user's current reservations
function getReservations(req, res) {
	Reservation.find({ 'username': req.session.username }, function(err, reservations) {
		if(err) {
			res.send(err);
		}
		res.json(reservations);
	});
};

//Returns the number of rooms available at a certain time
function getNumOfReservations(req, res) {
	//TODO add room number checking for teleconference and phoneline
Reservation.find( {$and : [{'createdDate':  req.dateSaver}, {'createdTime': req.timeIncrement}]}, function(err, reservations) {
		if(err) {
			res.send(err);
		}
		res.json(reservations);
	}).toArray();
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
			res.render('app/index', function(err, html){
				res.send(html);
			});
		}
	});
	
	//assigns the usename to sesh.username in order to log in
	//the username is obtained from the 
	app.post('/login', function(req, res) {
		sesh = req.session;
		sesh.username=req.body.username;
		res.end('done');
	});
	
	//If there is session data then the user is sent
	//to the landing.html page
	app.get('/landing', function(req, res) {
		sesh = req.session;
		if(sesh.username) {
			res.render('app/landing.html');
		}
		else {
			res.redirect('/');
		}
	});
	
	//get all of the current user's reservations
	app.get('api/myReservations', function(req, res) {
		//use mongoose to get's current user's reservations in database
		getReservations(req, res);
	});
	
	//get number of reservations for a certain time
	app.get('api/currentDateRes', function(req, res) {
		//use mongoose to get the number of open rooms for each hour listed
		getNumOfReservations(req, res);
	})
	
	// create todo and send back all todos after creation
	app.post('/api/reservations', function(req, res) {
		//create a reservation, information comes from AJAX request from Angular
		Reservation.create({
			reserver : req.body.reserver,
			reservedAs : req.body.reservedAs,
			date : req.body.date
		}, function(err, reservation) {
			if(err) {
				res.send(err);
			}
			//get the updated list of reservations when you create new one
			//getReservations(res);
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