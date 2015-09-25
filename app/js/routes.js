module.exports = function(app) {
	
  app.getReservations('', function(username) {
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
  });
  
}