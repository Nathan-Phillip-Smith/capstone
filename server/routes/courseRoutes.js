const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportConfig = require('../config/passport')
const User = require('../models/User')
const Course = require('../models/Course')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/* || GET COURSES || */

router.get(
  '/view-courses',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const courses = await Course.find().lean()

    // If no courses
    if (!courses?.length) {
      return res
        .status(400)
        .json({ message: { msgBody: 'No courses found', msgError: true } })
    }
    res.json(courses)
  }
)

/* || POST COURSES || */

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
    const course = await Course.findById(req.body.id)
    if (req.body.credits + course['Credit Hours'] > 18) {
      return res.status(400).json({
        message: {
          msgBody: 'Cannot Exceed 18 Credit Hours',
          msgError: true,
        },
      })
    }
    const user = await User.findOne({ username: req.user.username })
    updatedUser = user.classes.push(course._id)
    updatedUser = await user.save()
    res.status(200).json({
      message: {
        msgBody: `${updatedUser.firstName} added ${course['Course Title']}`,
        msgError: false,
      },
    })
  }
)
router.post(
  '/remove-class',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const course = await Course.findById(req.body.id)
    const user = await User.findOne({ username: req.user.username })
    let updatedUser = user.classes.pull(req.body.id)
    updatedUser = await user.save()
    res.status(200).json({
      message: {
        msgBody: `${updatedUser.firstName} removed ${course['Course Title']}`,
        msgError: false,
      },
    })
  }
)

module.exports = router
