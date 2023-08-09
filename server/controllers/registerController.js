// const User = require('../models/User')
// const bcrypt = require('bcrypt')
// const BCRYPT_SALT_ROUNDS = 10

// const createNewUser = async (req, res, next) => {
//   const duplicate = User.findOne({ username: req.body.username }).lean().exec()

//   if (!duplicate) {
//     console.log('username already taken')
//     return res.status(401).send({
//       success: false,
//       message: 'Username is taken',
//     })
//   }
//   bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
//     const userObject = {
//       username: req.body.username,
//       password: hashedPassword,
//       email: req.body.email,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       phone: req.body.phone,
//       address: req.body.address,
//     }
//     User.create(userObject).then((user) => {
//       res.send({
//         success: true,
//         message: 'User created successfully.',
//         user: {
//           id: user._id,
//           username: user.username,
//         },
//       })
//     })
//   })
// }

// module.exports = { createNewUser }
