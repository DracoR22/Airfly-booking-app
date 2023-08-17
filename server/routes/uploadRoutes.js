const express = require("express")
const router = express.Router()
const photosMiddleware = require('../middlewares/photosMiddleware')
const uploadController = require('../controllers/uploadController')

router.post('/upload', photosMiddleware.array('photos', 100), uploadController.uploadImage)

module.exports = router