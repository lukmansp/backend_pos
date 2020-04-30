const express = require('express')
const Route = express.Router()

const { authentication, authorization } = require('../helpers/auth')
const productController = require('../controllers/product')
const { productUpload } = require('../helpers/upload')

Route
    .get('/', authentication,authorization,productController.getAll)
    .get('/:productId', productController.getId)
    .post('/', productUpload, productController.insertData)
    .patch('/:bookId', productUpload, productController.updateData)
    .delete('/:bookId', productController.deleteData)

module.exports = Route

