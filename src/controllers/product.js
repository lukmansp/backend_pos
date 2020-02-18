const productModel = require('../models/product')
const connection = require('../configs/mysql')
const miscHelper = require('../helpers')



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
            const result = await productModel.getAll(name, sortBy, orderBy, limit, startIndex)
            miscHelper.response(response, 200, result)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },
    //menampilkan data berdasarkan id
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
    //input data client
    insertData: async (request, response) => {
        try {
            const {
                name,
                description,
                price,
                category_id,
            } = request.body;
            const data = {
                name,
                description,
                image: `http://localhost:9009/uploads/${request.file.filename}`,
                category_id,
                price,
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
    //mengubah data clilent
    updateData: async (request, response) => {
        try {
            const bookId = request.params.bookId
            const {
                name,
                description,
                price,
                category
            } = request.body;
            const data = {
                name,
                description,
                image: `http://localhost:9009/uploads/${request.file.filename}`,
                category,
                price,
                updated_at: new Date()
            }
            const result = await bookModel.updateData(data, bookId)
            miscHelper.response(response, 200, result)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },
    //menghapus data client
    deleteData: async (request, response) => {
        try {
            const bookId = request.params.bookId
            const result = await bookModel.deleteData(bookId)
            miscHelper.response(response, 200, result)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    }
    //menampilkan data berdasarkan order client
    // getOrder: async (request, response) => {
    //     try {
    //         const sortBy = request.query.sortBy
    //         const orderBy = request.query.orderBy

    //         const result = await productModel.getOrder(sortBy, orderBy)
    //         miscHelper.response(response, 200, result)
    //     } catch (error) {
    //         console.log(error)
    //         miscHelper.customErrorResponse(response, 404, 'Internal server error')
    //     }
    // },
    //pagination
    // getPage: (request, response) => {
    //     var { name, page, limit, sortBy } = request.query
    //     name = typeof name !== 'undefined' ? name : ""
    //     page = typeof page !== 'undefined' ? page : 0
    //     limit = typeof limit !== 'undefined' ? limit : 3
    //     sortBy = typeof sortBy !== 'undefined' ? sortBy : 'id'

    //     connection.query("SELECT * FROM product", (error, result) => {
    //         if (!error) {
    //             let pages = result.length
    //             console.log(pages)
    //             if (limit >= pages) {
    //                 pages = 1;
    //             } else if (pages % limit == 0) {
    //                 pages = pages / limit
    //             } else {
    //                 pages = (pages % limit) + 1
    //             }

    //             productModel.getPage(name, page, limit, sortBy)
    //                 .then(resultQuery => {
    //                     response.json({
    //                         status: 200,
    //                         amount: resultQuery.length,
    //                         page: pages,
    //                         message: 'success getting data',
    //                         data: resultQuery
    //                     })
    //                 })
    //                 .catch(error => {
    //                     console.log(error);
    //                     response.status(400).json({
    //                         status: 400,
    //                         message: 'error getting data'
    //                     })
    //                 })
    //         } else {
    //             console.log("Data not isset")
    //         }
    //     })

    // }

}