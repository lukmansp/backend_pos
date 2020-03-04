const userModel = require('../models/user')
const helper = require('../helpers/')
const JWT = require('jsonwebtoken')
const miscHelper = require('../helpers')
const { JWT_KEY } = require('../configs')

module.exports = {
    getUser: async (request, response) => {
        try {
            const name = request.query.name || ''
            const result = await userModel.getUser(name)
            miscHelper.response(response, 200, result)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },
    updateData: async (request, response) => {
        try {
            const userId = request.params.userId
            const salt = helper.generateSalt(18)

            const hashPassword = helper.setPassword(request.body.password, salt)
            const data = {
                name: request.body.name,
                email: request.body.email,
                salt: hashPassword.salt,
                password: hashPassword.passwordHash,
                otoritas_id: request.body.otoritas_id || '2',
                updated_at: new Date()
            }
            const result = await userModel.updateData(data, userId)
            miscHelper.response(response, 200, result)
        } catch (error) {
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },
    deleteData: async (request, response) => {
        try {
            const userId = request.params.userId
            const result = await userModel.deleteData(userId)
            miscHelper.response(response, 200, userId)
        } catch (error) {
            console.log(error)
            miscHelper.customErrorResponse(response, 404, 'Internal server error')
        }
    },
    register: async (request, response) => {
        try {
            const salt = helper.generateSalt(18)

            const hashPassword = helper.setPassword(request.body.password, salt)
            const data = {
                name: request.body.name,
                email: request.body.email,
                salt: hashPassword.salt,
                password: hashPassword.passwordHash,
                otoritas_id: request.body.otoritas_id || '2',
                created_at: new Date(),
                updated_at: new Date()
            }
            const result = await userModel.register(data)
            response.json(result)
        } catch (error) {
            console.log(error)
        }
    },
    login: async (request, response) => {
        const data = {
            password: request.body.password,
            email: request.body.email
        }

        const emailValid = await userModel.checkEmail(data.email)
        const dataUser = emailValid[0]
        const hashPassword = helper.setPassword(data.password, dataUser.salt)

        if (hashPassword.passwordHash === dataUser.password) {
            const token = JWT.sign({
                email: dataUser.email,
                id: dataUser.id
            }, JWT_KEY, { expiresIn: '9h' })

            delete dataUser.salt
            delete dataUser.password

            dataUser.token = token

            response.json(dataUser)
        } else {
            response.json({ message: 'Login error!' })
        }
    }
}