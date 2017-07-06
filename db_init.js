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

  db.run("DROP TABLE events");
  db.run("CREATE TABLE if not exists users (id INTEGER PRIMARY KEY, fname TEXT, lname TEXT, email TEXT, location TEXT, password TEXT)");

  // var stmt = db.prepare("INSERT INTO users (fname, lname, email, location, password) VALUES(?,?,?,?,?)");
  // var hashPassword;
  // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  //   // Store hash in your password DB. 
  //   stmt.run(fname,lname,email,location,hash);
  //   stmt.finalize();
  // });

  db.run("CREATE TABLE if not exists events (id INTEGER PRIMARY KEY, title TEXT, description TEXT, location TEXT, city TEXT, imgName TEXT, startdate TEXT, starttime TEXT, enddate TEXT, endtime TEXT, type TEXT, user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id))");
  // var stmt = db.prepare("INSERT INTO events (title, description, location, startdate, starttime, enddate, endtime, type, user_id) VALUES(?,?,?,?,?,?,?,?,?)");
  // stmt.run("Meal at Beehive", "hello this is a description", "Sheffield", "2017-06-20", "18:00", "2017-06-20", "20:00", "public", 1);
  // stmt.finalize();

  db.run("DROP TABLE users_events");
  db.run("CREATE TABLE if not exists users_events (user_id INTEGER, event_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(event_id) REFERENCES events(id))");
  // var stmt = db.prepare("INSERT INTO users_events (user_id, event_id) VALUES(?,?)");
  // stmt.run(1,2);
  // stmt.finalize();
});