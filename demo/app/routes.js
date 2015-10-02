module.exports = function(app) {

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
}