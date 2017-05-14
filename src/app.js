// load libraries
const express = require('express')
const path = require('path')

// load modules
const errorhandler = require('./errorhandler')
const items = require('./routes/items')

// set common paths
const publicPath = path.resolve(__dirname, '../public')
const indexHtml = path.resolve(__dirname, '../index.html')

// define express routes
const app = express()

module.exports = app
  .use(express.static(publicPath))
  .get('/', (req, res) => res.sendFile(indexHtml))
  .use('/api/items', items)
  .use(errorhandler)

// const log = function (entry) {
//   fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n')
// }
