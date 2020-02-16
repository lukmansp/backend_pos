const express = require('express')
const Route = express.Router()

const bookRouter = require('./book')

Route
  .use('/book', bookRouter)

module.exports = Route
