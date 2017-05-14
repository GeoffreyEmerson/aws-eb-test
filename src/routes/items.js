const express = require('express')
const router = express.Router()

const db = require('./queries')

module.exports = router
.get('/', function (req, res) {
  res.send('sweet!')
})
.get('/setup', db.setupDB)
.get('/getAllItems', db.getAllItems)
