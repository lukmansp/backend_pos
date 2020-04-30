const express = require('express')
const Route = express.Router()
const { authentication, authorization } = require('../helpers/auth')

const orderController = require('../controllers/order')

Route
    .get('/', orderController.getAll)
    .get('/chart', orderController.chartHistory)
    // .get('/:id_product', orderController.getId)
    .post('/', orderController.insertOrder)
module.exports = Route

