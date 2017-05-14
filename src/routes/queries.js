var promise = require('bluebird')

var options = {
  // Initialization Options
  promiseLib: promise
}

// Get database info from env
const {RDS_HOSTNAME, RDS_PORT, RDS_USERNAME, RDS_PASSWORD} = process.env

// start connection
var pgp = require('pg-promise')(options)
var connectionString = `postgres://${RDS_USERNAME}:${RDS_PASSWORD}@${RDS_HOSTNAME}:${RDS_PORT}/`
var db = pgp(connectionString)

// add query functions

const setupSQL = require('./items.sql')

function setupDB (req, res, next) {
  db.any(`${setupSQL}`)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'set up database'
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
  setupDB,
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
