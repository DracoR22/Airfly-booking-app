const express = require ('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db.js')

require('dotenv').config()
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+'/uploads'))
app.use(cors({
   credentials: true,
   origin: ['http://localhost:5173', 'https://dulcet-truffle-2cd630.netlify.app'],
   }));


const userRoutes = require('./routes/userRoutes.js')
const postRoutes = require('./routes/placeRoutes.js')
const bookingRoutes = require('./routes/bookingRoutes.js')
const uploadRoutes = require('./routes/uploadRoutes.js')

app.use("/api/v1/auth", userRoutes) 
app.use("/api/v1/post", postRoutes)
app.use("/api/v1/book", bookingRoutes)
app.use("/api/v1/images", uploadRoutes)


 app.listen(3000, () => {
    connectDB(process.env.MONGO_URL)
    console.log('server on port 3000')
 })