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
            connection.query(`SELECT product.id,product.name, product.stock ,order_product.user, order_product.quantity, order_product.price, order_product.total , order_product.updated_at FROM product LEFT JOIN order_product ON product.id = order_product.id_product WHERE product.name LIKE '%${name}%' ORDER BY ${sortBy} ${orderBy} LIMIT ${limit} OFFSET ${startIndex}`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
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
        return new Promise((resolve, reject)=>{

            connection.query(sqlInsertOrder,dataOrder,(error,result)=>{
                if(error)reject(new Error(error))
                    resolve(result)
            })
        })
    },
    insertDetail:(detailOrder)=>{
        return new Promise((resolve,reject)=>{
            connection.query(sqlSearchProduct,detailOrder.id_product,(error,result)=>{
            const update = connection.query(sqlUpdateProduct,[result[0].stock - detailOrder.quantity,detailOrder.id_product])

            connection.query('INSERT INTO detail_order SET ?', detailOrder,(error,result)=>{
                if(error)reject(new Error(error))
                    resolve(result)
            })
            })
        })
    },
    reduceStock:(detailOrder)=>{
       return new Promise((resolve,reject)=>{
        connection.query(sqlSearchProduct, detailOrder.id_product, (error,result)=>{
            console.log(result)
            // if(result.length > 0 && result[0].stock > orderDetail.quantity)
            //    connection.query(sqlUpdateProduct, [result[0].stock - orderDetail.quantity],result[0].id, (error,result)=>{
            //     if(error)reject(new Error(error))
            //         resolve(result)
            //    }) 
        })
       }) 
    }
}