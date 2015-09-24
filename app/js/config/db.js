var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : '3306',
  user     : 'root',
  socketPath   : '/var/run/mysql/mysql.sock',
  password : 'ogahD0TahSh',
  database : 'steamreserve',
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
});

