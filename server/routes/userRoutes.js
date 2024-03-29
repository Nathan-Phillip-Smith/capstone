const express = require('express')
const router = express.Router()
const passport = require('passport')
const logger = require('../middleware/logger')
const passportConfig = require('../config/passport')
const User = require('../models/User')
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
    logger.error('Username is already taken')
    console.log(duplicate)
    return res.status(409).json({
      message: { msgBody: 'Username is already taken', msgError: true },
    })
  }
  if (
    !username ||
    !password ||
    !email ||
    !firstName ||
    !lastName ||
    !phone ||
    !address
  ) {
    logger.error('All fields are required')
    return res
      .status(400)
      .json({ message: { msgBody: 'All fields are required', msgError: true } })
  }

  const USER_REGEX = /^[A-z]{3,20}$/
  const PWD_REGEX = /^[A-z]{4,20}$/
  const FNAME_REGEX = /^[A-z]{1,20}$/
  const LNAME_REGEX = /^[A-z]{1,20}$/
  const EMAIL_REGEX = /^[A-z0-9!@#$%.-_]{7,50}$/
  const PHONE_REGEX = /^[0-9()-\s]{7,20}$/
  const ADD_REGEX = /^[A-z0-9!@#$%'()-_"\s]{1,200}$/

  const canRegister = [
    FNAME_REGEX.test(firstName),
    LNAME_REGEX.test(lastName),
    EMAIL_REGEX.test(email),
    PHONE_REGEX.test(phone),
    ADD_REGEX.test(address),
    USER_REGEX.test(username),
    PWD_REGEX.test(password),
  ].every(Boolean)

  if (canRegister) {
    //   Hash password
    const hashedPwd = await bcrypt.hash(password, 10) //salt rounds
    let createdUser
    if (req.body.isAdmin) {
      createdUser = await User.create({
        firstName,
        lastName,
        email,
        phone,
        address,
        username,
        password: hashedPwd,
        roles: ['student', 'admin'],
      })
    } else {
      createdUser = await User.create({
        firstName,
        lastName,
        email,
        phone,
        address,
        username,
        password: hashedPwd,
      })
    }

    if (createdUser) {
      // new user created
      return res
        .status(201)
        .json({ message: { msgBody: 'New user created', msgError: false } })
    } else {
      logger.error('Invalid user data received')
      return res.status(400).json({
        message: { msgBody: 'Invalid user data received', msgError: true },
      })
    }
  } else {
    logger.error(`Invalid Credentials`)
    return res.status(400).json({
      message: {
        msgBody: `Invalid Credentials`,
        msgError: true,
      },
    })
  }
})

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, roles, classes } = req.user
      const token = signToken(_id)
      res.cookie('access_token', token, { httpOnly: true })

      res
        .status(200)
        .json({ isAuthenticated: true, user: { username, roles, classes } })
    }
  }
)

router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.clearCookie('access_token')
    res.json({ user: { username: '', roles: [] }, success: true })
  }
)
router.get(
  '/student',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = {
      _id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phone: req.user.phone,
      address: req.user.address,
      username: req.user.username,
    }

    res.status(200).json({
      message: {
        msgBody: `Received data for ${user.firstName}`,
        msgError: false,
      },
      user,
    })
  }
)
router.post(
  '/student-id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = await User.findById(req.body.id)

    if (user) {
      res.status(200).json({
        message: {
          msgBody: `Received data for ${user.firstName}`,
          msgError: false,
        },
        user,
      })
    } else {
      logger.error(`No Student Found`)
      res.status(400).json({
        message: {
          msgBody: `No Student Found`,
          msgError: true,
        },
        user,
      })
    }
  }
)
router.get(
  '/students',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.roles.includes('admin')) {
      const students = await User.find().lean()
      if (!students?.length) {
        logger.error(`No Students Found`)
        return res
          .status(400)
          .json({ message: { msgBody: 'No students found', msgError: true } })
      }
      res.status(200).json({
        message: { msgBody: 'Found Student', msgError: false },
        students,
      })
    } else {
      logger.error(`Unauthorized`)
      res.status(401).json({
        message: {
          msgBody: `Unauthorized`,
          msgError: true,
        },
        user,
      })
    }
  }
)

router.post('/edit-user', async (req, res) => {
  const { _id, firstName, lastName, email, phone, address, username } = req.body
  if (
    !_id ||
    !username ||
    !email ||
    !firstName ||
    !lastName ||
    !phone ||
    !address
  ) {
    logger.error('All fields are required')
    return res
      .status(400)
      .json({ message: { msgBody: 'All fields are required', msgError: true } })
  }

  // Confirm user exists to update
  const user = await User.findById(_id).exec()

  if (!user) {
    logger.error('User not found')
    return res.status(400).json({ message: 'User not found' })
  }

  //   check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec()
  //   Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== _id) {
    logger.error(`Username already taken`)
    return res.status(409).json({
      message: {
        msgBody: `Username already taken`,
        msgError: true,
      },
    })
  }

  user.username = username
  user.email = email
  user.firstName = firstName
  user.lastName = lastName
  user.phone = phone
  user.address = address

  const USER_REGEX = /^[A-z]{3,20}$/
  const FNAME_REGEX = /^[A-z]{1,20}$/
  const LNAME_REGEX = /^[A-z]{1,20}$/
  const EMAIL_REGEX = /^[A-z0-9!@#$%.-_]{7,50}$/
  const PHONE_REGEX = /^[0-9()-\s]{7,20}$/
  const ADD_REGEX = /^[A-z0-9!@#$%'()-_"\s]{1,200}$/

  const canEdit = [
    FNAME_REGEX.test(user.firstName),
    LNAME_REGEX.test(user.lastName),
    EMAIL_REGEX.test(user.email),
    PHONE_REGEX.test(user.phone),
    ADD_REGEX.test(user.address),
    USER_REGEX.test(user.username),
  ].every(Boolean)

  if (canEdit) {
    const updatedUser = await user.save()

    return res.status(201).json({
      message: {
        msgBody: `${updatedUser.firstName} has been edited Successfully`,
        msgError: false,
      },
    })
  } else {
    logger.error(`Invalid Credentials`)
    return res.status(400).json({
      message: {
        msgBody: `Invalid Credentials`,
        msgError: true,
      },
    })
  }
})

/* || ADMIN ROUTES || */

router.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.roles.includes('admin')) {
      res
        .status(200)
        .json({ message: { msgBody: 'You are an admin', msgError: false } })
    } else {
      logger.error('You are not an admin')
      res
        .status(403)
        .json({ message: { msgBody: 'You are not an admin', msgError: true } })
    }
  }
)

router.get(
  '/authenticated',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { username, roles, classes } = req.user
    res
      .status(200)
      .json({ isAuthenticated: true, user: { username, roles, classes } })
  }
)
router.delete(
  '/delete-user',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.roles.includes('admin')) {
      const { id } = req.body

      // Confirm data
      if (!id) {
        logger.error('User Id required')
        return res
          .status(400)
          .json({ message: { msgBody: 'User Id required', msgError: true } })
      }

      // Confirm course exists to delete
      const user = await User.findById(id).exec()

      if (!user) {
        logger.error('User not found')
        return res
          .status(400)
          .json({ message: { msgBody: 'User not found', msgError: true } })
      }

      const result = await user.deleteOne()

      const reply = `User '${result.username}' with ID ${result._id} deleted`

      res.json({ message: { msgBody: reply, msgError: false } })
    } else {
      logger.error('Unauthorized')
      res
        .status(400)
        .json({ message: { msgBody: 'Unauthorized', msgError: true } })
    }
  }
)

module.exports = router
