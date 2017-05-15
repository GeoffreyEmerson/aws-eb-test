const express = require('express')
const router = express.Router()

const db = require('./queries')

module.exports = router
.get('/', function (req, res) {
  res.send('sweet!')
})
.get('/createTable', db.createTable)
.get('/getAllItems', db.getAllItems)
.get('/dbConfig', db.dbConfig)
.get('/insertData', db.insertData)
.get('/dropTable', db.dropTable)
