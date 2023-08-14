require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./middleware/errorHandler')
const { logger } = require('./middleware/logger')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const port = process.env.PORT || 3500
const passport = require('passport')
const session = require('express-session')

connectDB()

app.use(morgan('tiny', { stream: logger.stream }))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.set('trust proxy', 1)
app.use(logger)
app.use(passport.initialize())
app.use(passport.session())
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, '../frontend/dist')))
app.use('/users', require('./routes/userRoutes'))
app.use('/courses', require('./routes/courseRoutes'))
app.use(errorHandler)

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
