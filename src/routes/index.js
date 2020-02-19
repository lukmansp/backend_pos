const express = require('express')
const Route = express.Router()

const bookRouter = require('./product')
const userRoute = require('./user')

Route
  .use('/uploads', express.static("./uploads"))
  .use('/product', bookRouter)
  .use('/user', userRoute)

module.exports = Route
