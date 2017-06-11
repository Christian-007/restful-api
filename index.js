var express = require('express');
var cors = require('cors') // Cross Origin Resource Sharing
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db-app');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cors())

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/api', function(req, res){
  var sql = "SELECT * from users";
  db.all(sql, function(err,rows){
    res.end(JSON.stringify(rows));
  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


