const Booking = require('../models/Booking')
const getUserDataFromReq = require('../utils/getUserData')

module.exports = {
    //-----------------------------//create booking in place model//------------------------- //
    createBooking: async (req, res) => {
      const userData = await getUserDataFromReq(req)
      const {place,checkIn,checkOut,guests,name,mobile,price} = req.body
       Booking.create({
        place,checkIn,checkOut,guests,name,mobile,price,
         user:userData.id
        }).then((doc) => {
        res.json(doc)
       }).catch((err) => {
         throw err
       })
    },

    //-----------------------------//create user booking//------------------------- //
    getBooking: async (req, res) => {
      const userData = await getUserDataFromReq(req)
      userData.id
      res.json(await Booking.find({user:userData.id}).populate('place'))
    }
}