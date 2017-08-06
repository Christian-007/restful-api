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
  db.run("CREATE TABLE if not exists events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, location TEXT, city TEXT, imgName TEXT, startdate TEXT, starttime TEXT, endtime TEXT, type TEXT, user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id))");
  var stmt = db.prepare("INSERT INTO events (title, description, location, city, imgName, startdate, starttime, endtime, type, user_id) VALUES(?,?,?,?,?,?,?,?,?,?)");
  stmt.run("Meal at Beehive", "This event is created for anyone who wants to enjoy British cuisine. Britain is really famous for its pub food and therefore, you need to try it!", "Beehive, West Street", "Sheffield", "beehive.jpg", "2017-08-20", "18:00", "20:00", "public", 1);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO events (title, description, location, city, imgName, startdate, starttime, endtime, type, user_id) VALUES(?,?,?,?,?,?,?,?,?,?)");
  stmt.run("Meal at Cavendish", "This event is created for anyone who wants to enjoy British cuisine. Britain is really famous for its pub food and therefore, you need to try it!", "220-238 West Street", "Sheffield", "cavendish.jpg", "2017-08-22", "13:00", "14:00", "public", 1);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO events (title, description, location, city, imgName, startdate, starttime, endtime, type, user_id) VALUES(?,?,?,?,?,?,?,?,?,?)");
  stmt.run("Meal at Yates", "This event is created for anyone who wants to enjoy British cuisine. Britain is really famous for its pub food and therefore, you need to try it!", "2-6 Cambridge St", "Sheffield", "yates.jpg", "2017-08-21", "17:30", "19:00", "public", 2);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO events (title, description, location, city, imgName, startdate, starttime, endtime, type, user_id) VALUES(?,?,?,?,?,?,?,?,?,?)");
  stmt.run("Meal at Noodle Doodle", "This event is created for anyone who wants to enjoy Chinese cuisine. China is really famous for its spicy food and therefore, you need to try it!", "34 Trippet Ln", "Sheffield", "noodle.jpg", "2017-08-25", "12:30", "14:00", "public", 1);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO events (title, description, location, city, imgName, startdate, starttime, endtime, type, user_id) VALUES(?,?,?,?,?,?,?,?,?,?)");
  stmt.run("Meal at Istanbul", "This event is created for anyone who wants to enjoy Turkish cuisine. Turkey is really famous for its kebab and therefore, you should to try it!", "152-154 West Street", "Sheffield", "istanbul.png", "2017-08-29", "12:00", "13:30", "public", 3);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO events (title, description, location, city, imgName, startdate, starttime, endtime, type, user_id) VALUES(?,?,?,?,?,?,?,?,?,?)");
  stmt.run("Meal at Noodle Inn", "This event is created for anyone who wants to enjoy Chinese cuisine. China is really famous for its spicy food and therefore, you need to try it!", "15 Westfield Terrace", "Sheffield", "noodle_inn.jpeg", "2017-09-01", "12:30", "14:00", "public", 1);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO events (title, description, location, city, imgName, startdate, starttime, endtime, type, user_id) VALUES(?,?,?,?,?,?,?,?,?,?)");
  stmt.run("Meal at China Red", "This event is created for anyone who wants to enjoy Chinese cuisine. China is really famous for its spicy food and therefore, you should to try it!", "3-5 Rockingham Gate", "Sheffield", "chinared.jpg", "2017-09-08", "18:00", "20:30", "public", 1);
  stmt.finalize();

  db.run("DROP TABLE users_events");
  db.run("CREATE TABLE if not exists users_events (user_id INTEGER, event_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(event_id) REFERENCES events(id))");
  var stmt = db.prepare("INSERT INTO users_events (user_id, event_id) VALUES(?,?)");
  stmt.run(1,1);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO users_events (user_id, event_id) VALUES(?,?)");
  stmt.run(1,2);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO users_events (user_id, event_id) VALUES(?,?)");
  stmt.run(2,3);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO users_events (user_id, event_id) VALUES(?,?)");
  stmt.run(1,4);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO users_events (user_id, event_id) VALUES(?,?)");
  stmt.run(3,5);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO users_events (user_id, event_id) VALUES(?,?)");
  stmt.run(1,6);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO users_events (user_id, event_id) VALUES(?,?)");
  stmt.run(1,7);
  stmt.finalize();

  // db.run("DROP TABLE stars");
  db.run("CREATE TABLE if not exists stars (id INTEGER PRIMARY KEY, person_id INTEGER, user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id))");

  db.run("DROP TABLE activities");
  db.run("CREATE TABLE if not exists activities (id INTEGER PRIMARY KEY, user_id INTEGER, event_id INTEGER, event_title TEXT, activityType TEXT, date TEXT, time TEXT, timeCreated INTEGER)");  
  var stmt = db.prepare("INSERT INTO activities (user_id, event_id, event_title, activityType, date, time, timeCreated) VALUES(?,?,?,?,?,?,?)");
  stmt.run(1,1, "Meal at Beehive", "created", fullSQLDate, timeSQL, timeCreated);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO activities (user_id, event_id, event_title, activityType, date, time, timeCreated) VALUES(?,?,?,?,?,?,?)");
  stmt.run(1,2, "Meal at Cavendish", "created", fullSQLDate, timeSQL, timeCreated);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO activities (user_id, event_id, event_title, activityType, date, time, timeCreated) VALUES(?,?,?,?,?,?,?)");
  stmt.run(2,3, "Meal at Yates", "created", fullSQLDate, timeSQL, timeCreated);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO activities (user_id, event_id, event_title, activityType, date, time, timeCreated) VALUES(?,?,?,?,?,?,?)");
  stmt.run(1,4, "Meal at Noodle Doodle", "created", fullSQLDate, timeSQL, timeCreated);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO activities (user_id, event_id, event_title, activityType, date, time, timeCreated) VALUES(?,?,?,?,?,?,?)");
  stmt.run(3,5, "Meal at Istanbul", "created", fullSQLDate, timeSQL, timeCreated);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO activities (user_id, event_id, event_title, activityType, date, time, timeCreated) VALUES(?,?,?,?,?,?,?)");
  stmt.run(1,6, "Meal at Noodle Inn", "created", fullSQLDate, timeSQL, timeCreated);
  stmt.finalize();
  var stmt = db.prepare("INSERT INTO activities (user_id, event_id, event_title, activityType, date, time, timeCreated) VALUES(?,?,?,?,?,?,?)");
  stmt.run(1,7, "Meal at China Red", "created", fullSQLDate, timeSQL, timeCreated);
  stmt.finalize();

  db.run("COMMIT;");
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
});