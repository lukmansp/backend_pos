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
            connection.query(`SELECT user.id,user.name,user.email,user.salt,user.password,user.otoritas_id,user_access.access_menu,user.created_at FROM user LEFT JOIN user_access ON user.otoritas_id = user_access.otoritas WHERE user.email LIKE '%${email}%'`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    getUser:(name)=>{
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT user.id,user.name,user.email,user.salt,user.password,user_access.name_menu,user_access.access_menu,user.created_at FROM user LEFT JOIN user_access ON user.otoritas_id = user_access.otoritas WHERE user.name LIKE '%${name}%'`, (error,result)=>{
                if(error)reject(new Error(error))
                    resolve(result)
            })
        })
    },
    getMenu:()=>{
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM user_access', (error,result)=>{
                if(error)reject(new Error(error))
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
    },
    updateAccess: (data, otoritas_id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE user_access SET ? WHERE id = ?', [data, otoritas_id], (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },

}