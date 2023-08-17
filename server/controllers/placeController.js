const jwt = require("jsonwebtoken")
const jwtSecret = require("../utils/jwt")
const Place = require("../models/Place")

module.exports = {
    //-----------------------------//create a new place//------------------------- //
    createPlaces: async (req, res) => {
        const {token} = req.cookies
        const {title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
           if (err) throw err
       const placeDoc = await Place.create ({ 
           owner:userData.id,
           title,address,photos:addedPhotos,
           description,perks,extraInfo
           ,checkIn,checkOut,maxGuests,price
     
     })
     res.json(placeDoc)
      })
    },

     //-----------------------------//get user places//------------------------- //
    userPlaces: async (req, res) => {
        const {token} = req.cookies
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
           const {id} = userData
           res.json(await Place.find({owner:id}))
        })
    },

    //-----------------------------//get place by id//------------------------- //
    getOnePlace: async (req, res) => {
        const {id} = req.params
        res.json(await Place.findById(id))
    },

    //-----------------------------//Edit user place//------------------------- //
    editPlaces: async (req, res) => {
        const {token} = req.cookies
        const {id,title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price}
         = req.body
         jwt.verify(token, jwtSecret, {}, async (err, userData) => {
           if (err) throw err
           const placeDoc = await Place.findById(id)
           if (userData.id === placeDoc.owner.toString()) {
             placeDoc.set({
                 title,address,photos:addedPhotos,
                 description,perks,extraInfo
                 ,checkIn,checkOut,maxGuests,price
             })
            await placeDoc.save()
             res.json('ok')
           }
         })
    },

    //-----------------------------//get all places//------------------------- //
    getAllPlaces: async (req, res) => {
       res.json(await Place.find())
    }
}