// const User = require('../models/User')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')

// const loginUser = async (req, res, next) => {
//   User.findOne({ username: req.body.username })
//     .lean()
//     .exec()
//     .then((user) => {
//       //No user found
//       if (!user) {
//         return res.status(401).send({
//           success: false,
//           message: 'Could not find the user.',
//         })
//       }

//       //Incorrect password
//       bcrypt.compare(req.body.password, user.password).then((response) => {
//         if (response !== true) {
//           return res.status(401).send({
//             success: false,
//             message: 'Incorrect password',
//           })
//         }

//         const payload = {
//           username: user.username,
//         }

//         const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
//           expiresIn: '1d',
//         })

//         return res.status(200).send({
//           success: true,
//           message: 'Logged in successfully!',
//           token: 'Bearer ' + token,
//         })
//       })
//     })
// }

// module.exports = { loginUser }
