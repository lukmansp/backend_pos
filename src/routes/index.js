const express = require('express')
const Route = express.Router()

const bookRouter = require('./product')

Route
  .use('/uploads', express.static("./uploads"))
  .use('/product', bookRouter)

module.exports = Route
