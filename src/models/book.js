const connection = require('../configs/mysql')

module.exports = {
    getAll: (searchName) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product WHERE name LIKE '%${searchName}%'`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    getOrder: (order) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM product ORDER BY updated_at ASC', (error, result) => {
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
            connection.query('DELETE FROM book WHERE id = ?', bookId, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }

}