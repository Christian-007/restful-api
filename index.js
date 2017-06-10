var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/api', function(req, res){
  // Initialise sqlite3 database
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database('test');

  db.serialize(function() {
    db.run("CREATE TABLE if not exists user (id INT, dt TEXT)");

    var stmt = db.prepare("INSERT INTO user VALUES(?,?)");
    for(var i=0; i<10; i++){
      var d = new Date();
      var n = d.toLocaleTimeString();
      stmt.run(i, n);
    }

    stmt.finalize();
  });
  
  var sql = "SELECT id,dt from user";
  db.all(sql, function(err,rows){
    res.end(JSON.stringify(rows));
  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


