// Initialise sqlite3 database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db-app');

// Encrypt password
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'bacon';
const someOtherPlaintextPassword = 'not_bacon';
var fname = "Christian"; var lname = "Sunardi"; var email = "christian@gmail.com"; var location = "Sheffield";

db.serialize(function() {
  db.run("CREATE TABLE if not exists users (id INTEGER PRIMARY KEY, fname TEXT, lname TEXT, email TEXT, location TEXT, password TEXT)");

  var stmt = db.prepare("INSERT INTO users (fname, lname, email, location, password) VALUES(?,?,?,?,?)");
  var hashPassword;
  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB. 
    stmt.run(fname,lname,email,location,hash);
    stmt.finalize();
  });
});

// Load hash from your password DB. 
// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true 
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
//     // res == false 
// });