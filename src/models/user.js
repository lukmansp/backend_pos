const connection = require('../configs/mysql')

module.exports = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user SET ?', data, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    checkEmail: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE email = ?', email, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    getUser: (name) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM user WHERE name LIKE '%${name}%'`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    updateData: (data, userId) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE user SET ? WHERE id = ?', [data, userId], (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteData: (userId) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM user WHERE id = ?', userId, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }

}