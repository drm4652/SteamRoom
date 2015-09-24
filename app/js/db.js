// set up
var mysql   = require('mysql');                  //mysql so js can connect and use mysql
var express = require('express');                
var app     = express();                         //express assisting with module creation

var morgan         = require('morgan'); 		 // log requests to the console (express4)
var bodyParser     = require('body-parser'); 	 // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

//config
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : '3306',
  user     : 'naw7961',
  socketPath   : '/var/run/mysql/mysql.sock',
  password : 'naw7961',
  database : 'steamreserve',
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
});

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// routes
require('./routes.js')(app);