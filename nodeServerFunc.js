// set up =========================================
var express = require('express');
var session = require('express-session');
var app = express();  //create app with express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// config =========================================
//mongoose.connect('mongodb://localhost:27017/localSteam'); //connect to local mongoDB


app.set('port', 3000); //setting port to 3000
app.use(session({
	secret: 'secretsecrets',
	resave: false,
	saveUninitialized: false
	}));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override head in the request
//app.use('static', express.static(__dirname + '/app')); // set the public directory as our asset holder
app.set('view engine', 'html');
app.engine('html', require('ejs').renderfile);

// routes =========================================
require('./app/js/routes.js')(app);


// listen (start app with node nodeServerFunc.js)
app.listen(app.get('port'));
console.log("App listening on port " + app.get('port'));

//This is used in order to retrieve a list of reservations of the
//entered user and display them in a jquery accordion
//app.get('/views', (function(req, res) {
//  "use strict";
  //var sql = 'SELECT * FROM reservations WHERE username = ?';
  //sql = mysql.format(sql, username);
  //var sql = 'SELECT * FROM reservations WHERE username = "naw7961"';
 // connection.query(sql, function(err, results) {
    //if (err) {
    //  console.error('error with query: ' + err.stack);
    //  return 1;
    //}
    //if (results) {
    //  res.render('reservations', {
    //    reservations: results
    //  });
   // }
  //});
//}));

module.exports = app;