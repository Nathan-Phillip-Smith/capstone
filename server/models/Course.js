const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  'Course ID': {
    type: String,
    required: true,
  },
  'Course Title': {
    type: String,
    required: true,
  },
  'Course Description': {
    type: String,
    required: true,
  },
  'Classroom Number': {
    type: String,
    required: true,
  },
  Capacity: {
    type: Number,
    required: true,
  },
  'Credit Hours': {
    type: Number,
    required: true,
  },
  'Tuition Cost': {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Course', courseSchema)
