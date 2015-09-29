var mysql = require('mysql');
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

  //This is used in order to retrieve a list of reservations of the
  //entered user and display them in a jquery accordion
var Reservervations = (function()  {

    "use strict";
    return {
      listReservations: (function() {
        return {
          myReservations: (function(username) {
            var sql = 'SELECT * FROM reservations WHERE username = ?';
            sql = mysql.format(sql, username);
            connection.query(sql, function(err, results) {
              if (err) {
                console.error('error with query: ' + err.stack);
                return 1;
              }
              if (results) {
                return results;
              }
            });
          })
        };
      })
    };
  }());

