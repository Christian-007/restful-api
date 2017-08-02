// Initialise sqlite3 database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db-app');

// Encrypt password
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'bacon';
const someOtherPlaintextPassword = 'not_bacon';
var fname = "Christian"; var lname = "Sunardi"; var email = "christian@gmail.com"; var location = "Sheffield";
var profile_pic = "user_default.png"; var cover_pic = "cover_default.png";

var hours = new Date().getHours(); var minutes = new Date().getMinutes();
var year = new Date().getFullYear(); var month = new Date().getMonth(); var date = new Date().getDate();
var fullSQLDate = year+"-"+month+"-"+date;
var timeSQL = hours+":"+minutes;
var timeCreated = new Date().getTime();

db.serialize(function() {
  db.run("BEGIN TRANSACTION;");
  // db.run("DROP TABLE users");
  db.run("CREATE TABLE if not exists users (id INTEGER PRIMARY KEY, fname TEXT, lname TEXT, profile_pic TEXT, cover_pic TEXT, email TEXT, location TEXT, password TEXT)");

  // var stmt = db.prepare("INSERT INTO users (fname, lname, profile_pic, cover_pic, email, location, password) VALUES(?,?,?,?,?,?,?)");
  // var hashPassword;
  // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  //   // Store hash in your password DB. 
  //   stmt.run(fname,lname,profile_pic,cover_pic,email,location,hash);
  //   stmt.finalize();
  // });
  
  db.run("DROP TABLE events");
  db.run("CREATE TABLE if not exists events (id INTEGER PRIMARY KEY, title TEXT, description TEXT, location TEXT, city TEXT, imgName TEXT, startdate TEXT, starttime TEXT, endtime TEXT, type TEXT, user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id))");
  var stmt = db.prepare("INSERT INTO events (title, description, location, city, imgName, startdate, starttime, endtime, type, user_id) VALUES(?,?,?,?,?,?,?,?,?,?)");
  stmt.run("Meal at Beehive", "This event is created for anyone who wants to enjoy British cuisine. Britain is really famous for its pub food and therefore, you need to try it!", "Beehive, West Street", "Sheffield", "beehive.jpg", "2017-08-20", "18:00", "20:00", "public", 1);
  stmt.finalize();

  db.run("DROP TABLE users_events");
  db.run("CREATE TABLE if not exists users_events (user_id INTEGER, event_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(event_id) REFERENCES events(id))");
  var stmt = db.prepare("INSERT INTO users_events (user_id, event_id) VALUES(?,?)");
  stmt.run(1,1);
  stmt.finalize();

  // db.run("DROP TABLE stars");
  db.run("CREATE TABLE if not exists stars (id INTEGER PRIMARY KEY, person_id INTEGER, user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id))");

  db.run("DROP TABLE activities");
  db.run("CREATE TABLE if not exists activities (id INTEGER PRIMARY KEY, user_id INTEGER, event_id INTEGER, event_title TEXT, activityType TEXT, date TEXT, time TEXT, timeCreated INTEGER)");  
  var stmt = db.prepare("INSERT INTO activities (user_id, event_id, event_title, activityType, date, time, timeCreated) VALUES(?,?,?,?,?,?,?)");
  stmt.run(1,1, "Meal at Beehive", "created", fullSQLDate, timeSQL, timeCreated);
  stmt.finalize();

  db.run("COMMIT;");
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
});