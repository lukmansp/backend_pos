const express = require('express')
const Route = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })
const productController = require('../controllers/product')

Route
    .get('/', productController.getAll)
    .get('/:productId', productController.getId)
    .get('/orderName', productController.getOrder)
    .get('/page', productController.getPage)
    .post('/', upload.single('image'), productController.insertData)
    .patch('/:bookId', upload.single('image'), productController.updateData)
    // .patch('/:bookId', upload.single('image'), productController.updateData)
    .delete('/:bookId', productController.deleteData)

module.exports = Route

