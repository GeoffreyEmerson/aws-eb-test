// load libraries
const express = require('express')
const path = require('path')

// load modules
const errorhandler = require('./errorhandler')
const items = require('./routes/items')

// set common paths
const publicPath = path.resolve(__dirname, '../public')
const indexHtml = path.resolve(__dirname, '../index.html')

// Get database info from env
const {RDS_HOSTNAME, RDS_PORT, RDS_DB_NAME, RDS_USERNAME, RDS_PASSWORD} = process.env

// define express routes
const app = express()

module.exports = app
  .use(express.static(publicPath))
  .get('/', (req, res) => res.sendFile(indexHtml))
  .use('/api/items', items)
  .use('/api/db', (req, res) => res.send({RDS_HOSTNAME, RDS_PORT, RDS_DB_NAME, RDS_USERNAME, RDS_PASSWORD}))
  .use(errorhandler)

// const log = function (entry) {
//   fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n')
// }

// RDS_HOSTNAME – The hostname of the DB instance.
// Amazon RDS console label – Endpoint combines hostname and port.

// RDS_PORT – The port on which the DB instance accepts connections. The default value varies between DB engines.
// Amazon RDS console label – Port

// RDS_DB_NAME – The database name, ebdb.
// Amazon RDS console label – DB Name

// RDS_USERNAME – The user name that you configured for your database.
// Amazon RDS console label – Username

// RDS_PASSWORD – The password that you configured for your database.
