const express = require('express')
const Route = express.Router()

const bookRouter = require('./product')
const userRoute = require('./user')
const orderRoute = require('./order')

Route
  .use('/uploads', express.static("./uploads"))
  .use('/product', bookRouter)
  .use('/user', userRoute)
  .use('/order', orderRoute)

module.exports = Route
