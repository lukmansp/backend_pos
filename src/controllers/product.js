const productModel = require('../models/product')
const connection = require('../configs/mysql')
const miscHelper = require('../helpers')
const multer = require('multer')
const redisCache = require('../helpers/redisChace')

module.exports = {
    getAll: async (request, response) => {
        try {
            const name = request.query.name || ''
            const sortBy = request.query.sortBy || 'id'
            const orderBy = request.query.orderBy || 'asc'
            const pages = request.query.pages || 1
            const limit = request.query.limit || 15
            const offset = parseInt(pages);
            const startIndex = limit * (offset - 1);
            // const result = await productModel.getAll(name, sortBy, orderBy, limit, startIndex)
            // miscHelper.response(response, 200, result)
            const key = `get-all-product-${name}-${sortBy}-${orderBy}-${limit}-${offset}`
            const resultCache = await redisCache.get(key)

            if (resultCache) miscHelper.response(response, 200, resultCache)

            if (resultCache === null) {
                const result = await productModel.getAll(name, sortBy, orderBy, limit, startIndex)
                await redisCache.set(key, result)
                miscHelper.response(response, 200, result)
            }
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
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
            const data = {
                name: request.body.name,
                description: request.body.description,
                image: `http://localhost:9009/uploads/${request.file.filename}`,
                price: request.body.price,
                stock: request.body.stock,
                category_id: request.body.category_id,
                created_at: new Date(),
                updated_at: new Date()
            }
            const result = await productModel.insertData(data)
            miscHelper.response(response, 200, result)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },

    updateData: async (request, response) => {
        try {
            const bookId = request.params.bookId
            const {
                name,
                description,
                price,
                category_id
            } = request.body;
            const data = {
                name,
                description,
                image: `http://localhost:9009/uploads/${request.file.filename}`,
                category_id,
                price,
                updated_at: new Date()
            }
            const result = await productModel.updateData(data, bookId)
            miscHelper.response(response, 200, result)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },

    deleteData: async (request, response) => {
        try {
            const bookId = request.params.bookId
            const result = await productModel.deleteData(bookId)
            miscHelper.response(response, 200, result)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },



}