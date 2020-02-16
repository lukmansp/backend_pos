const express = require('express')
const Route = express.Router()

const { getAll, getOrder, insertData, updateData, deleteData } = require('../controllers/book')

Route
    .get('/', getAll)
    .get('/orderName', getOrder)
    .post('/', insertData)
    .patch('/:bookId', updateData)
    .delete('/:bookId', deleteData)

module.exports = Route

