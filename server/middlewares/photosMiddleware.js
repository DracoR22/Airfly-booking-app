const multer = require('multer')

const photosMiddleware = multer({dest:'/tmp'})

module.exports = photosMiddleware