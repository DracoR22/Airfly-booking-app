const jwt = require('jsonwebtoken')
const User = require('../models/User')
const jwtSecret = require('../utils/jwt')

module.exports = {
    //-----------------------------//signup method to create user//------------------------- //
    register: async (req, res) => {
        const{name, email, password} = req.body
        try{
           const userDoc = await User.create({
              name,
              email,
              password,
             })
             res.json(userDoc)
        } catch (e) {
           res.status(422)(e)
        }
    },

     //-----------------------------//login method to login user//------------------------- //
     login: async (req, res) => {
        const{email, password} = req.body
        const userDoc = await User.findOne({email})
        if (userDoc) {
        const passOk = password === userDoc.password;
        if (passOk) {
          
           jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {}, (err, token) => {
              if(err) throw err
              res.cookie('token', token, {
                 secure: true, 
                 sameSite: 'none',
              }).json(userDoc)
        })
        } else {
           res.status(422).json('pass not ok')
        }
        } else {
           res.json('not found')
        }
     },

      //-----------------------------//get current user profile//------------------------- //
     profile: async (req, res) => {
        const {token} = req.cookies
         if(token) {
         jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err
          const {name, email,_id} = await User.findById(userData.id)
          res.json({name, email,_id})
             })
          } else {
           res.json(null)
                 }
     },

     //-----------------------------//logout user//------------------------- //
     logout: async (req, res) => {
        res.cookie('token', '').json(true)
     }
}