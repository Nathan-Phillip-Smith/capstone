const User = require('../models/User')
const Course = require('../models/Course')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc GET all courses
// @route GET /courses
// @access Private
const getAllCourses = asyncHandler(async (req, res) => {
  // Get all courses from MongoDB
  const courses = await Course.find().lean()

  // If no courses
  if (!courses?.length) {
    return res.status(400).json({ message: 'No courses found' })
  }

  // Add username to each course before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop

  // const coursesWithUser = await Promise.all(
  //   courses.map(async (course) => {
  //     const user = await User.findById(course.user).lean().exec()
  //     return { ...course, username: user.username }
  //   })
  // )

  // res.json(coursesWithUser)

  res.json(courses)
})

// @desc Create new course
// @route POST /courses
// @access Private
const createNewCourse = asyncHandler(async (req, res) => {
  const { courseId, courseTitle, courseDesc, roomNum, capacity, hours, cost } =
    req.body

  // Confirm data
  if (
    !courseId ||
    !courseTitle ||
    !courseDesc ||
    !roomNum ||
    !capacity ||
    !hours ||
    !cost
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Check for duplicate title
  const duplicate = await Course.findOne({ 'Course ID': courseId })
    .lean()
    .exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate Course ID' })
  }

  // Create and store the new user
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
    return res.status(201).json({ message: 'New course created' })
  } else {
    return res.status(400).json({ message: 'Invalid course data received' })
  }
})

// @desc Update a course
// @route PATCH /courses
// @access Private
const updateCourse = asyncHandler(async (req, res) => {
  const {
    id,
    courseId,
    courseTitle,
    courseDesc,
    roomNum,
    capacity,
    hours,
    cost,
  } = req.body

  // Confirm data
  if (
    !id ||
    !courseId ||
    !courseTitle ||
    !courseDesc ||
    !roomNum ||
    !capacity ||
    !hours ||
    !cost
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Confirm course exists to update
  const course = await Course.findById(id).exec()

  if (!course) {
    return res.status(400).json({ message: 'Course not found' })
  }

  // Check for duplicate title
  const duplicate = await Course.findOne({ 'Course ID': courseId })
    .lean()
    .exec()

  // Allow renaming of the original course
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate course title' })
  }

  course['Course ID'] = courseId
  course['Course Title'] = courseTitle
  course['Course Description'] = courseDesc
  course['Classroom Number'] = roomNum
  course.Capacity = capacity
  course['Credit Hours'] = hours
  course['Tuition Cost'] = cost

  const updatedCourse = await course.save()

  res.json(`'${updatedCourse['Course Title']}' updated`)
})

// @desc Delete a course
// @route DELETE /courses
// @access Private
const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.body

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'Course ID required' })
  }

  // Confirm course exists to delete
  const course = await Course.findById(id).exec()

  if (!course) {
    return res.status(400).json({ message: 'Course not found' })
  }

  const result = await course.deleteOne()

  const reply = `Course '${result['Course Title']}' with ID ${result._id} deleted`

  res.json(reply)
})

module.exports = {
  getAllCourses,
  createNewCourse,
  updateCourse,
  deleteCourse,
}
