const express = require('express')
const Route = express.Router()
const { authentication, authorization } = require('../helpers/auth')
const { register, login, getUser, updateData, deleteData,updateAccess,getMenu } = require('../controllers/user')

Route
     .get('/',authentication,authorization, getUser)
    .get('/menu',getMenu)
    .post('/register', register)
    .post('/login', login)
     .patch('/:userId', updateData)
    .patch('/menu/:otoritas_id',updateAccess)
    .delete('/:userId', deleteData)


module.exports = Route