require('dotenv').config()
const connection = require('../configs/mysql')
const SQL = require('sql-template-strings');
module.exports = {
    getAll: (name, sortBy, orderBy, limit, startIndex) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT product.id, product.name, product.description, product.image, category.category_name ,product.price, product.stock, product.created_at, product.updated_at FROM product LEFT JOIN category ON product.category_id = category.id WHERE product.name LIKE '%${name}%' ORDER BY ${sortBy} ${orderBy} LIMIT ${limit} OFFSET ${startIndex}`, (error, result) => {
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