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
  '/get-course',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.roles.includes('admin')) {
      const { id } = req.body
      const foundCourse = await Course.findById(id).lean().exec()
      if (!foundCourse) {
        return res
          .status(400)
          .json({ message: { msgBody: 'No course found', msgError: true } })
      }
      res.status(200).json({
        message: { msgBody: 'Found Course', msgError: false },
        course: foundCourse,
      })
    } else {
      res
        .status(400)
        .json({ message: { msgBody: 'Unauthorized', msgError: true } })
    }
  }
)

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

router.post('/edit-course', async (req, res) => {
  const {
    _id,
    courseId,
    courseTitle,
    courseDesc,
    roomNum,
    capacity,
    credits,
    tuition,
  } = req.body
  if (
    !_id ||
    !courseId ||
    !courseTitle ||
    !courseDesc ||
    !roomNum ||
    !capacity ||
    !credits ||
    !tuition
  ) {
    return res
      .status(400)
      .json({ message: { msgBody: 'All fields are required', msgError: true } })
  }

  // Confirm course exists to update
  const course = await Course.findById(_id).exec()

  if (!course) {
    return res.status(400).json({ message: 'Course not found' })
  }

  //   check for duplicate
  const duplicate = await User.findOne({ 'Course ID': courseId }).lean().exec()
  //   Allow updates to the original course
  if (duplicate && duplicate?._id.toString() !== _id) {
    return res.status(409).json({
      message: {
        msgBody: `Course ID already taken`,
        msgError: true,
      },
    })
  }

  course['Course ID'] = courseId
  course['Course Title'] = courseTitle
  course['Course Description'] = courseDesc
  course['Classroom Number'] = roomNum
  course.Capacity = capacity
  course['Credit Hours'] = credits
  course['Tuition Cost'] = tuition

  const updatedCourse = await course.save()

  return res.status(201).json({
    message: {
      msgBody: `${updatedCourse['Course Title']} has been edited Successfully`,
      msgError: false,
    },
  })
})
router.post('/create-course', async (req, res) => {
  const {
    courseId,
    courseTitle,
    courseDesc,
    roomNum,
    capacity,
    credits,
    tuition,
  } = req.body
  if (
    !courseId ||
    !courseTitle ||
    !courseDesc ||
    !roomNum ||
    !capacity ||
    !credits ||
    !tuition
  ) {
    return res
      .status(400)
      .json({ message: { msgBody: 'All fields are required', msgError: true } })
  }

  //   check for duplicate
  const duplicate = await User.findOne({ 'Course ID': courseId }).lean().exec()

  if (duplicate) {
    return res.status(409).json({
      message: {
        msgBody: `Course ID already taken`,
        msgError: true,
      },
    })
  }
  const course = await Course.create({
    'Course ID': courseId,
    'Course Title': courseTitle,
    'Course Description': courseDesc,
    'Classroom Number': roomNum,
    Capacity: capacity,
    'Credit Hours': credits,
    'Tuition Cost': tuition,
  })

  if (course) {
    return res.status(201).json({
      message: {
        msgBody: `${course['Course Title']} has been created Successfully`,
        msgError: false,
      },
    })
  } else {
    return res.status(400).json({
      message: {
        msgBody: `Invalid Course Info`,
        msgError: true,
      },
    })
  }
})

/* || DELETE COURSES || */

router.delete(
  '/delete-course',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.roles.includes('admin')) {
      const { id } = req.body

      // Confirm data
      if (!id) {
        return res
          .status(400)
          .json({ message: { msgBody: 'Course Id required', msgError: true } })
      }

      // Confirm course exists to delete
      const course = await Course.findById(id).exec()

      if (!course) {
        return res
          .status(400)
          .json({ message: { msgBody: 'Course not found', msgError: true } })
      }

      const result = await course.deleteOne()

      const reply = `Course '${result['Course Title']}' with ID ${result._id} deleted`

      res.json({ message: { msgBody: reply, msgError: false } })
    } else {
      res
        .status(400)
        .json({ message: { msgBody: 'Unauthorized', msgError: true } })
    }
  }
)

module.exports = router
