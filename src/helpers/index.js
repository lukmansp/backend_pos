const crypto = require('crypto')
const multer = require('multer')

module.exports = {
  generateSalt: (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
  },

  setPassword: (password, salt) => {
    const hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    const value = hash.digest('hex')
    return {
      salt: salt,
      passwordHash: value
    }
  },
  response: (response, status, data, pagination) => {
    const result = {}

    result.status = status || 200
    result.result = data

    return response.status(result.status).json(result)
  },
  customErrorResponse: (response, status, message) => {
    const result = {}

    result.status = status || 400
    result.message = message

    return response.status(result.status).json(result)
  },
  uploadImage:()=>{
    const storage = multer.diskStorage({
      destination: (request, file, cb) => {
          cb(null, './uploads');
      },
      filename: (request, file, cb) => {
          cb(null, file.originalname)
      }
      
  })
  return multer({storage})
  }

}