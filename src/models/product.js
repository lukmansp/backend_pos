require('dotenv').config()
const connection = require('../configs/mysql')
const SQL = require('sql-template-strings');
module.exports = {
    countData:(name, category)=>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT count(*) as totalData FROM product WHERE name LIKE '%${name}%' AND category_id LIKE '%${category}%'`, (error, result)=>{
                resolve(result[0].totalData)
            })
        })
    },
    getAll: (name, category , sortBy, orderBy, limit, startIndex) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT product.id, product.name, product.category_id,product.description, product.image, category.category_name ,product.price, product.stock, product.created_at, product.updated_at FROM product LEFT JOIN category ON product.category_id = category.id WHERE category.category_name LIKE '%${category}%' AND product.name LIKE '%${name}%' ORDER BY ${sortBy} ${orderBy} LIMIT ${limit} OFFSET ${startIndex}`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },

    getId: (productId) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM product WHERE id = ?', productId, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
     catId: (categoryId) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM product WHERE category_id = ?', categoryId, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },


    insertData: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO product SET ?', data, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },

    updateData: (data, bookId) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE product SET ? WHERE id = ?', [data, bookId], (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },

    deleteData: (bookId) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM product WHERE id = ?', bookId, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }

}