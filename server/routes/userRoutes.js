const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportConfig = require('../config/passport')
const User = require('../models/User')
const Course = require('../models/Course')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/* || Register Login & Logout || */

const signToken = (userID) => {
  return jwt.sign(
    {
      sub: userID,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: 60 * 60 * 1000 } // one day
  )
}

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phone, address, username, password } =
    req.body
  const duplicate = await User.findOne({ username }).lean().exec()
  if (duplicate) {
    console.log(duplicate)
    return res.status(409).json({
      message: { msgBody: 'Username is already taken', msgError: true },
    })
  }

  //   Hash password
  const hashedPwd = await bcrypt.hash(password, 10) //salt rounds

  const createdUser = await User.create({
    firstName,
    lastName,
    email,
    phone,
    address,
    username,
    password: hashedPwd,
  })
  if (createdUser) {
    // new user created
    return res
      .status(201)
      .json({ message: { msgBody: 'New user created', msgError: false } })
  } else {
    return res.status(400).json({
      message: { msgBody: 'Invalid user data received', msgError: true },
    })
  }
})

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, isAdmin } = req.user
      const token = signToken(_id)
      res.cookie('access_token', token, { httpOnly: true, sameSite: true })
      res
        .status(200)
        .json({ isAuthenticated: true, user: { username, isAdmin } })
    }
  }
)

router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.clearCookie('access_token')
    res.json({ user: { username: '', isAdmin: false }, success: true })
  }
)

/* || ADD CLASS CREATE CLASS REMOVE CLASS || */

router.post(
  '/new-class',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const {
      courseId,
      courseTitle,
      courseDesc,
      roomNum,
      capacity,
      hours,
      cost,
    } = req.body
    //  Check for duplicate ID
    const duplicate = await Course.findOne({ 'Course ID': courseId })
      .lean()
      .exec()

    if (duplicate) {
      return res
        .status(409)
        .json({ message: { msgBody: 'Duplicate Course ID', msgError: true } })
    }

    // Create and store the new course
    const course = await Course.create({
      'Course ID': courseId,
      'Course Title': courseTitle,
      'Course Description': courseDesc,
      'Classroom Number': roomNum,
      Capacity: capacity,
      'Credit Hours': hours,
      'Tuition Cost': cost,
    })

    if (course) {
      // Created
      return res
        .status(201)
        .json({ message: { msgBody: 'New course created', msgError: false } })
    } else {
      return res.status(400).json({
        message: { msgBody: 'Invalid course data received', msgError: false },
      })
    }
  }
)

router.post(
  '/add-class',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const course = await Course.findOne({ 'Course ID': req.body.courseId })
    const user = await User.findOne({ username: req.user.username })
    updatedUser = user.classes.push(course._id)
    updatedUser = await user.save()
    res
      .status(200)
      .json(`${updatedUser.firstName} added ${course['Course Title']}`)
  }
)

/* || ADMIN ROUTES || */

router.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.isAdmin === true) {
      res
        .status(200)
        .json({ message: { msgBody: 'You are an admin', msgError: false } })
    } else {
      res
        .status(403)
        .json({ message: { msgBody: 'You are not an admin', msgError: true } })
    }
  }
)

router.get(
  '/authenticated',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { username, isAdmin } = req.user
    res.status(200).json({ isAuthenticated: true, user: { username, isAdmin } })
  }
)

module.exports = router
