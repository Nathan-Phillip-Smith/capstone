const User = require('../models/User')
const Course = require('../models/Course')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc GET all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean()
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' })
  }
  res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, address, username, password } =
    req.body

  //confirm data
  if (
    !username ||
    !password ||
    !email ||
    !firstName ||
    !lastName ||
    !phone ||
    !address
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  //   Check for Duplicate
  const duplicate = await User.findOne({ username }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate username' })
  }

  //   Hash password
  const hashedPwd = await bcrypt.hash(password, 10) //salt rounds

  const userObject = {
    username,
    password: hashedPwd,
    email,
    firstName,
    lastName,
    phone,
    address,
  }

  //   create and store new user
  const user = await User.create(userObject)

  if (user) {
    // create
    res
      .status(201)
      .json({ message: `New student ${firstName} ${lastName} created` })
  } else {
    res.status(400).json({ message: 'Invalid student data received' })
  }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const {
    id,
    username,
    email,
    firstName,
    lastName,
    phone,
    address,
    password,
    isAdmin,
  } = req.body

  // Confirm data
  if (
    !id ||
    !username ||
    !email ||
    !firstName ||
    !lastName ||
    !phone ||
    !address ||
    typeof isAdmin !== 'boolean'
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  //   check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec()
  //   Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate username' })
  }

  user.username = username
  user.email = email
  user.firstName = firstName
  user.lastName = lastName
  user.phone = phone
  user.address = address
  user.isAdmin = isAdmin

  if (password) {
    // hash password
    user.password = await bcrypt.hash(password, 10) // salt rounds
  }

  const updatedUser = await user.save()

  res.json({
    message: `${updatedUser.firstName} ${updatedUser.lastName} updated`,
  })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'User ID required' })
  }

  const course = await Course.findOne({ user: id }).lean().exec()
  if (course) {
    return res.status(400).json({ message: 'User has assigned courses' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const result = await user.deleteOne()

  const reply = `Username ${result.username} with ID ${result._id} deleted`

  res.json(reply)
})

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
}
