const bookModel = require('../models/book')
module.exports = {
    getAll: async (request, response) => {
        try {
            const searchName = request.query.name || ''
            const result = await bookModel.getAll(searchName)
            response.json(result)
        } catch (error) {
            console.log(error)
        }
    },

    getOrder: async (request, response) => {
        try {
            const order = request.params
            const result = await bookModel.getOrder(order)
            response.json(result)
        } catch (error) {
            console.log(error)
        }
    },
    insertData: async (request, response) => {
        try {
            const data = {
                name: request.body.name,
                description: request.body.
                    description,
                image: request.body.image,
                category: request.body.category,
                price: request.body.price,
                created_at: new Date(),
                updated_at: new Date()
            }
            const result = await bookModel.insertData(data)
            response.json(result)
        } catch (error) {
            console.log(error)
        }
    },
    updateData: async (request, response) => {
        try {
            const bookId = request.params.bookId
            const data = {
                name: request.body.name,
                description: request.body.
                    description,
                image: request.body.image,
                category: request.body.category,
                price: request.body.price,
                updated_at: new Date()
            }
            const result = await bookModel.updateData(data, bookId)
            response.json(result)
        } catch (error) {
            console.log(error)
        }
    },
    deleteData: async (request, response) => {
        try {
            const bookId = request.params.bookId
            const result = await bookModel.dele1qteData(bookId)
            response.json(result)
        } catch (error) {
            console.log(error)
        }
    }

}