require('dotenv').config()
const connection = require('../configs/mysql')
const SQL = require('sql-template-strings');
const sqlInsertOrder = ('INSERT INTO order_product SET ?')
// const sqlSearch = ('SELECT * FROM order_product WHERE id_product=?', dataOrder.id_product)
const sqlSearchProduct = ('SELECT * FROM product WHERE id = ?')
const sqlUpdateProduct = ("UPDATE product SET stock = ? WHERE id = ?")


module.exports = {

    getAll: (name, sortBy, orderBy, limit, startIndex) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT order_product.id_order,product.name ,order_product.id_user,product.price ,detail_order.quantity ,order_product.total,order_product.created_at FROM order_product LEFT JOIN detail_order ON order_product.id_order = detail_order.id_order LEFT JOIN product ON detail_order.id_product = product.id', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
 chartHistory:(name, category)=>{
        return new Promise((resolve, reject)=>{
            connection.query('SELECT count(*) as totalData FROM order_product', (error, result)=>{
                resolve(result[0].totalData)
            })
        })
    },
    getId: (id_product) => {
        return new Promise((resolve, reject) => {
            connection.query(sqlSearchProduct, id_product, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
   

    insertOrder: (dataOrder) => {
        return new Promise((resolve, reject) => {

            connection.query(sqlInsertOrder, dataOrder, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    insertDetail: (detailOrder) => {
        return new Promise((resolve, reject) => {
            connection.query(sqlSearchProduct, detailOrder.id_product, (error, result) => {
                const update = connection.query(sqlUpdateProduct, [result[0].stock - detailOrder.quantity, detailOrder.id_product])

                connection.query('INSERT INTO detail_order SET ?', detailOrder, (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            })
        })
    },
}