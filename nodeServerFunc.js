// set up =========================================
var express = require('express');
var app = express();  //create app with express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// config =========================================
mongoose.connect('mongodb://localhost:27017/localSteam'); //connect to local mongoDB


app.set('port', 3000); //setting port to 8000
//app.set('views', path.join(__dirname, 'views')); //this will have the views in the view folder
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
//app.set('view engine', 'jade'); //set jade as the templating engine
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override head in the request
app.use(express.static(path.join(__dirname, 'views'))); // set the public directory as our asset holder

// routes =========================================
require('./app/js/routes.js')(app);

// listen (start app with node nodeServerFunc.js)
app.listen(app.get('port'));
console.log("App listening on port " + app.get('port'));

//This is used in order to retrieve a list of reservations of the
//entered user and display them in a jquery accordion
app.get('/views', (function(req, res) {
  "use strict";
  //var sql = 'SELECT * FROM reservations WHERE username = ?';
  //sql = mysql.format(sql, username);
  var sql = 'SELECT * FROM reservations WHERE username = "naw7961"';
  connection.query(sql, function(err, results) {
    if (err) {
      console.error('error with query: ' + err.stack);
      return 1;
    }
    if (results) {
      res.render('reservations', {
        reservations: results
      });
    }
  });
}));

app.get('/', (function(req, res) {
  "use strict";
   })
);