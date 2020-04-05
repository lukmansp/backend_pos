const productModel = require('../models/product')
const connection = require('../configs/mysql')
const miscHelper = require('../helpers')
const multer = require('multer')
const uuidv4 = require('uuid/v4')
// const redisCache = require('../helpers/redisChace')

module.exports = {
    getAll: async (request, response) => {
        try {
            const name = request.query.name || ''
            const category = request.query.category || ''
            const sortBy = request.query.sortBy || 'id'
            const orderBy = request.query.orderBy || 'asc'
            const pages = request.query.pages || 1
            const limit = request.query.limit || 6
            const offset = parseInt(pages);
            const startIndex = limit * (offset - 1);
            const totalData= await productModel.countData(name,category)

            const result = await productModel.getAll(name, category,sortBy, orderBy, limit, startIndex)
            const paginate = Math.ceil(totalData/limit)
            const pager={
                paginate
            }

            miscHelper.responsePage(response, 200, result, pager)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(responsePage, 404, 'Internal server error')
        }
    },

    getId: async (request, response) => {
        try {
            const productId = request.params.productId
            const result = await productModel.getId(productId)
            miscHelper.response(response, 200, result)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },

    insertData: async (request, response) => {
        try {
            const id = uuidv4()
            // const key = 'get-all-product'
            const data = {
                id,
                name: request.body.name,
                description: request.body.description,
                image: `http://54.242.170.33/uploads/${request.file.filename}`,
                price: request.body.price,
                stock: request.body.stock,
                category_id: request.body.category_id,
                created_at: new Date(),
                updated_at: new Date()
            }
            // await redisCache.del(key)
            const result = await productModel.insertData(data)
            console.log(data)
            miscHelper.response(response, 200, data)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },

    updateData: async (request, response) => {
        try {
            const bookId = request.params.bookId
            console.log(request.file)
            if (!request.file || Object.keys(request.file).length === 0) {
                const {
                    name,
                    description,
                    price,
                    stock,
                    category_id
                } = request.body;

                const data = {
                    name,
                    description,
                    price,
                    stock,
                    category_id,
                }
                const result = await productModel.updateData(data, bookId)
                const newData = {
                    ...data,
                    id:bookId

                }
                return miscHelper.response(response, 200, newData)
                //return this.updateData;
            }

            const {
                name,
                description,
                price,
                stock,
                category_id
            } = request.body;
            const data = {
                name,
                description,
                image: `http://54.242.170.33/uploads/${request.file.filename}`,
                price,
                stock,
                category_id,
                updated_at: new Date()
            }
             const result = await productModel.updateData(data, bookId)
                const newData = {
                    ...data,
                    id:bookId

                }
                
               
                return miscHelper.response(response, 200, newData)


        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },

    deleteData: async (request, response) => {
        try {
            const bookId = request.params.bookId
            const result = await productModel.deleteData(bookId)
            miscHelper.response(response, 200, bookId)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },



}