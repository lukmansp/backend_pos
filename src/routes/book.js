const express = require('express')
const Route = express.Router()

const { getAll, getOrder, insertData, updateData, deleteData, getPage } = require('../controllers/book')

Route
    .get('/', getAll)
    .get('/orderName', getOrder)
    .get('/page', getPage)
    .post('/', insertData)
    .patch('/:bookId', updateData)
    .delete('/:bookId', deleteData)

module.exports = Route

