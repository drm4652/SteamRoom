var mysql = require('mysql');
var path = require('path');
var express = require('express');
var app = express();

  var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'naw7961',
    socketPath: '/var/run/mysql/mysql.sock',
    password: 'naw7961',
    database: 'steamreserve',
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  });
  
  app.set('port', 3000); //setting port to 8000
  app.set('views', path.join(__dirname, 'views')); //this will have the views in the view folder
  app.set('view engine', 'jade'); //set jade as the templating engine
  app.use(express.static(path.join(__dirname, 'public'))); // set the public directory as our asset holder

  //This is used in order to retrieve a list of reservations of the
  //entered user and display them in a jquery accordion
app.get('/views', (function(req, res)  {
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
      res.render('reservations', {reservations : results});
    }
  });
})
);
 
// function onRequest(request, response) {
//  console.log('received request');
//  var path = url.parse(request.url).pathname;
//  console.log('requested path: ' + path);
//  if (path === '') {
//    // call your already existing function here or start the batch file like this:
//    response.statusCode = 200;
//    response.write('getting reservations');
//    spawn();
//    response.write('got reservations');
//  } else {
//    response.statusCode = 400
//    response.write('Could not process your request, sorry.')
//  }
//  response.end()
//}

app.listen(app.get('port'));
