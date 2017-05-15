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

function getSingleItem (req, res, next) {
  var itemID = parseInt(req.params.id)
  db.one('select * from items where id = $1', itemID)
  .then(function (data) {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ONE item'
    })
  })
  .catch(function (err) {
    return next(err)
  })
}

function createItem (req, res, next) {
  console.log('createItem hit')
  const {name, media, release_date} = req.body
  console.log('received data to create:', req.body)
  db.none('INSERT INTO items (name, media, release_date) VALUES($1, $2, $3)', [name, media, release_date])
  .then(function () {
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one item'
    })
  })
  .catch(function (err) {
    return next(err)
  })
}

function updateItem (req, res, next) {
  const {name, media, release_date} = req.body
  db.none('update items set name=$1, media=$2, release_date=$3 where id=$4',
    [name, media, release_date, parseInt(req.params.id)]
  )
  .then(function () {
    res.status(200)
    .json({
      status: 'success',
      message: 'Updated item'
    })
  })
  .catch(function (err) {
    return next(err)
  })
}

function removeItem (req, res, next) {
  const itemID = parseInt(req.params.id)
  db.result('delete from items where id = $1', itemID)
  .then(function (result) {
    res.status(200)
    .json({
      status: 'success',
      message: `Removed ${result.rowCount} item`
    })
  })
  .catch(function (err) {
    return next(err)
  })
}

module.exports = {
  getAllItems,
  getSingleItem,
  createItem,
  updateItem,
  removeItem
}

// Disabled DB admin functions

// function dbConfig (req, res, next) {
//   res.status(200)
//     .json(config)
// }

// function createTable (req, res, next) {
//   db.none('CREATE TABLE items (ID SERIAL PRIMARY KEY, name VARCHAR, media VARCHAR, release_date VARCHAR);')
//   .then(function (data) {
//     res.status(200)
//     .json({
//       status: 'success',
//       data: data,
//       message: 'created table items'
//     })
//   })
//   .catch(function (err) {
//     return next(err)
//   })
// }

// function insertData (req, res, next) {
//   db.none('INSERT INTO items (name, media, release_date) VALUES($1, $2, $3)', ['Star Wars', 'LaserDisk', '1977'])
//   .then(function (data) {
//     res.status(200)
//     .json({
//       status: 'success',
//       data: data,
//       message: 'data added to table items'
//     })
//   })
//   .catch(function (err) {
//     return next(err)
//   })
// }

// function dropTable (req, res, next) {
//   db.none('DROP TABLE items;')
//   .then(function (data) {
//     res.status(200)
//     .json({
//       status: 'success',
//       data: data,
//       message: 'dropped table items'
//     })
//   })
//   .catch(function (err) {
//     return next(err)
//   })
// }
