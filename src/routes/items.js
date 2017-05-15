const express = require('express')
const router = express.Router()

const bodyparser = require('body-parser')
const jsonParser = bodyparser.json()

const db = require('./queries')

module.exports = router
.get('/', db.getAllItems)
.get('/:id', db.getSingleItem)
.post('/', jsonParser, db.createItem)
.put('/:id', jsonParser, db.updateItem)
.delete('/:id', db.removeItem)
