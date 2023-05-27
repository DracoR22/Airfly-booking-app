const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();
const app = express();

const jwtSecret = 'grer3qwer3gtfgfhmkhgfcvcbvngfth';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'https://64723dca565044201abef58c--dulcet-truffle-2cd630.netlify.app',
    ],
  })
);

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) {
        // Token verification failed
        res.sendStatus(401);
      } else {
        // Token verification successful, set the user data in the request context
        req.userData = userData;
        next();
      }
    });
  } else {
    // Token not provided
    res.sendStatus(401);
  }
}

app.get('/api', (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json({ users: ['Tom', 'Lador'] });
});

app.post('/register', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post('/login', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = password === userDoc.password;
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        }
      );
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

// Profile
app.get('/profile', authenticateToken, async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.userData;
  const { name, email, _id } = await User.findById(id);
  res.json({ name, email, _id });
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('token').json(true);
});

//Upload By Link
app.post('/upload-by-link', async (req, res) => {
   const { link } = req.body;
   const newName = 'photo' + Date.now() + '.jpg';
   await imageDownloader.image({
     url: link,
     dest: __dirname + '/uploads/' + newName,
   });
   res.json(newName);
 });
 
 //Upload Photo From Device
 const photosMiddleware = multer({ dest: 'uploads/' });
 app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
   const uploadedFiles = [];
   for (let i = 0; i < req.files.length; i++) {
     const { path, originalname } = req.files[i];
     const parts = originalname.split('.');
     const ext = parts[parts.length - 1];
     const newPath = path + '.' + ext;
     fs.renameSync(path, newPath);
     uploadedFiles.push(newPath.replace('uploads/', ''));
   }
   res.json(uploadedFiles);
 });
 
 //Post New Places
 app.post('/places', authenticateToken, async (req, res) => {
   mongoose.connect(process.env.MONGO_URL);
   const { id } = req.userData;
   const {
     title,
     address,
     addedPhotos,
     description,
     perks,
     extraInfo,
     checkIn,
     checkOut,
     maxGuests,
     price,
   } = req.body;
   const placeDoc = await Place.create({
     owner: id,
     title,
     address,
     photos: addedPhotos,
     description,
     perks,
     extraInfo,
     checkIn,
     checkOut,
     maxGuests,
     price,
   });
   res.json(placeDoc);
 });
 
 //Display Places User Profile
 app.get('/user-places', authenticateToken, async (req, res) => {
   mongoose.connect(process.env.MONGO_URL);
   const { id } = req.userData;
   res.json(await Place.find({ owner: id }));
 });
 
 //Access Specific File
 app.get('/places/:id', async (req, res) => {
   mongoose.connect(process.env.MONGO_URL);
   const { id } = req.params;
   res.json(await Place.findById(id));
 });
 
 //Edit Files
 app.put('/places', authenticateToken, async (req, res) => {
   mongoose.connect(process.env.MONGO_URL);
   const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
   const placeDoc = await Place.findById(id);
   if (req.userData.id === placeDoc.owner.toString()) {
     placeDoc.set({
       title,
       address,
       photos: addedPhotos,
       description,
       perks,
       extraInfo,
       checkIn,
       checkOut,
       maxGuests,
       price,
     });
     await placeDoc.save();
     res.json('ok');
   }
 });
 
 //Display Places Globally
 app.get('/places', async (req, res) => {
   mongoose.connect(process.env.MONGO_URL);
   res.json(await Place.find());
 });
 
 //Booking
 app.post('/booking', authenticateToken, async (req, res) => {
   mongoose.connect(process.env.MONGO_URL);
   const { id } = req.userData;
   const { place, checkIn, checkOut, guests, name, mobile, price } = req.body;
   Booking.create({
     place,
     checkIn,
     checkOut,
     guests,
     name,
     mobile,
     price,
     user: id,
   })
     .then((doc) => {
       res.json(doc);
     })
     .catch((err) => {
       throw err;
     });
 });
 
 app.get('/booking', authenticateToken, async (req, res) => {
   mongoose.connect(process.env.MONGO_URL);
   const { id } = req.userData;
   res.json(await Booking.find({ user: id }).populate('place'));
 });
 
 app.listen(process.env.PORT || 3000, () => {
   console.log('Server running on port 3000');
 });