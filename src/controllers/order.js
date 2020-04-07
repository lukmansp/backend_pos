const orderModel = require('../models/order')
const connection = require('../configs/mysql')
const miscHelper = require('../helpers')
const { v4: uuidv4 } = require('uuid');
module.exports = {
    getAll: async (request, response) => {
        try {
            const name = request.query.name || ''
            const sortBy = request.query.sortBy || 'id'
            const orderBy = request.query.orderBy || 'asc'
            const pages = request.query.pages || '1'
            const limit = request.query.limit || '15'
            const offset = parseInt(pages);
            const startIndex = limit * (offset - 1);
            const result = await orderModel.getAll(name, sortBy, orderBy, limit, startIndex)
            miscHelper.response(response, 200, result)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },
    chartHistory:async(request,response)=>{
        try{
            const result = await orderModel.chartHistory()
            miscHelper.response(response, 200 ,result)
        }catch(error){
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'internal server error')
        }
    },

    getId: async (request, response) => {
        try {
            const id_product = request.params.id_product
            const result = await orderModel.getId(id_product)
            miscHelper.response(response, 200, result)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },

    insertOrder: async (request, response) => {
        try {
            const payload = request.body
            const id_order = uuidv4()
            const dataOrder = {
                id_order,
                id_user: payload.id_user,
                total: payload.total,
                created_at: new Date(),
                updated_at: new Date()
            }
            const result = await orderModel.insertOrder(dataOrder)
            payload.product.map(async item => {
                const orderDetail = {
                    id_order,
                    id_product: item.id_product,
                    quantity: item.quantity
                }
                await orderModel.insertDetail(orderDetail)
            })


            miscHelper.response(response, 200, result)
        } catch (error) {
            miscHelper.customErrorResponse(response, 500, 'internal server')
        }
    }
}