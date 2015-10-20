var Reservation = require('./models/reservation');

function getReservations(res) {
	Reservation.find(function(err, reservations) {
		if(err) {
			res.send(err);
		}
		res.json(reservations);
	});
};

module.exports = function(app) {
	//declare session variable to store session data
	var sesh;
	
	//will render login page when no username is in session
	app.get('/', function(req, res) {
		sesh = req.session;
		if(sesh.username) {
			res.redirect('/landing');
		}
		else {
			res.render('index.html');
		}
	});
	
	//assigns the usename to sesh.username in order to log in
	//the username is obtained from the 
	app.post('/login', function(req, res) {
		sesh = req.session;
		sesh.username=req.body.username;
		res.end('done');
	});
	
	app.get('/landing', function(req, res) {
		sesh = req.session;
		if(sesh.username) {
			res.render('landing.html');
		}
		else {
			res.redirect('/');
		}
	});
	//get all reservations
	app.get('api/reservations', function(req, res) {
		//use mongoose to get all reservations in database
		getReservations(res);
	});
	
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
	app.delete('/api/reservations/:reserver_id', function(req, res) {
		Reservation.remove({
			_id : req.params.reservation_id
		}, function(err, todo) {
			if(err) {
				res.send(err);
			}
			getReservations(res);
		});
	});
	
	//application
	app.get('*', function(req, res) {
		res.sendfile('./views/listReservations.html'); // load the single view file
	});
});