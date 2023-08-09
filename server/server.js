require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const port = process.env.PORT || 3500
const passport = require('passport')
const session = require('express-session')

console.log(process.env.NODE_ENV)

connectDB()

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/users', require('./routes/userRoutes'))

mongoose.connection.once('open', () => {
  console.log('Connected to the DataBase')
  app.listen(port, () => {
    console.log(`server running on port ${port}`)
  })
})

mongoose.connection.on('error', (err) => {
  console.log(err)
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    mongoErrLog.log
  )
})
