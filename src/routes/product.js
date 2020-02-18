const express = require('express')
const Route = express.Router()
const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: (request, file, cb) => {
//         cb(null, './uploads');
//     },
//     filename: (request, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

const productController = require('../controllers/product')
const {uploadImage} =require('../helpers/index')

const upload = multer({uploadImage })

Route
    .get('/', productController.getAll)
     .get('/:productId', productController.getId)
    //.get('/orderName', productController.getOrder)
    //.get('/page', productController.getPage)
    .post('/', upload.single('image'), productController.insertData)
    .patch('/:bookId', upload.single('image'), productController.updateData)
    // .patch('/:bookId', upload.single('image'), productController.updateData)
    .delete('/:bookId', productController.deleteData)

module.exports = Route

