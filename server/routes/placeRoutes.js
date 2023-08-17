const express = require('express')
const router = express.Router()
const placeController = require("../controllers/placeController")

router.post('/places', placeController.createPlaces)
router.put('/places', placeController.editPlaces)
router.get('/places', placeController.getAllPlaces)
router.get('/userPlaces', placeController.userPlaces)
router.get('/places/:id', placeController.getOnePlace)

module.exports = router