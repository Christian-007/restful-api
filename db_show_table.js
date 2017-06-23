// Initialise sqlite3 database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db-app');

db.serialize(function () {
  db.each("select * from sqlite_master where type='table'", function (err, table) {
    console.log(table);
  });
});