var promise = require('bluebird')

var options = {
  // Initialization Options
  promiseLib: promise
}

// Get database info from env
const {RDS_HOSTNAME, RDS_PORT, RDS_DB_NAME, RDS_USERNAME, RDS_PASSWORD} = process.env
// Database connection parameters:
var config = {
  host: RDS_HOSTNAME,
  port: RDS_PORT,
  database: RDS_DB_NAME,
  user: RDS_USERNAME,
  password: RDS_PASSWORD
}

// start connection
var pgp = require('pg-promise')(options)
var db = pgp(config)

// add query functions

function dbConfig (req, res, next) {
  res.status(200)
    .json(config)
}

function createTable (req, res, next) {
  db.none('CREATE TABLE items (ID SERIAL PRIMARY KEY, name VARCHAR, media VARCHAR, release_date VARCHAR);')
  .then(function (data) {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'created table items'
    })
  })
  .catch(function (err) {
    return next(err)
  })
}

function insertData (req, res, next) {
  db.none('INSERT INTO items (name, media, release_date) VALUES($1, $1, $1)', 'Star Wars', 'LaserDisk', '1977')
  .then(function (data) {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'data added to table items'
    })
  })
  .catch(function (err) {
    return next(err)
  })
}

function dropTable (req, res, next) {
  db.none('DROP TABLE items;')
  .then(function (data) {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'dropped table items'
    })
  })
  .catch(function (err) {
    return next(err)
  })
}

function getAllItems (req, res, next) {
  db.any('select * from items')
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL items'
      })
  })
  .catch(function (err) {
    return next(err)
  })
}

module.exports = {
  dbConfig,
  createTable,
  dropTable,
  insertData,
  getAllItems
}

// RDS_HOSTNAME – The hostname of the DB instance.
// Amazon RDS console label – Endpoint combines hostname and port.

// RDS_PORT – The port on which the DB instance accepts connections. The default value varies between DB engines.
// Amazon RDS console label – Port

// RDS_DB_NAME – The database name, ebdb.
// Amazon RDS console label – DB Name

// RDS_USERNAME – The user name that you configured for your database.
// Amazon RDS console label – Username

// RDS_PASSWORD – The password that you configured for your database.
