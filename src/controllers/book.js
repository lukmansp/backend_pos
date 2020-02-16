const bookModel = require('../models/book')
const connection = require('../configs/mysql')
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
            const sortBy = request.query.sortBy
            const orderBy = request.query.orderBy
            const data = { sortBy, orderBy }
            const result = await bookModel.getOrder(data)
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
    },

    getPage: (request, response) => {
        var { name, page, limit, sortBy } = request.query
        name = typeof name !== 'undefined' ? name : ""
        page = typeof page !== 'undefined' ? page : 0
        limit = typeof limit !== 'undefined' ? limit : 3    
        sortBy = typeof sortBy !== 'undefined' ? sortBy : 'id'

        connection.query("SELECT * FROM product", (error, result) => {
            if (!error) {
                let pages = result.length
                console.log(pages)
                if (limit >= pages) {
                    pages = 1;
                } else if (pages % limit == 0) {
                    pages = pages / limit
                } else {
                    pages = (pages % limit) + 1
                }

                bookModel.getPage(name, page, limit, sortBy)
                    .then(resultQuery => {
                        response.json({
                            status: 200,
                            amount: resultQuery.length,
                            page: pages,
                            message: 'success getting data',
                            data: resultQuery
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        response.status(400).json({
                            status: 400,
                            message: 'error getting data'
                        })
                    })
            } else {
                console.log("Data not isset")
            }
        })

    }

}