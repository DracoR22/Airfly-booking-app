const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingController')

router.post('/booking', bookingController.createBooking)
router.get('/booking', bookingController.getBooking)

module.exports = router