const User = require('../models/User')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const bcrypt = require('bcrypt')

const cookieExtractor = (req) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['access_token']
  }
  return token
}

// authorization
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    },
    async (payload, done) => {
      const user = await User.findById({ _id: payload.sub })
      if (user) return done(null, user)
      else return done(null, false)
    }
  )
)

// authenticated local strategy using username and password
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username })
    // if no user exists
    if (!user) return done(null, false)

    const isMatch = bcrypt.compare(user.password, password)
    // if password doesn't match
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: 'Incorrect password',
      })
    }
    // passwords match
    return done(null, user)
  })
)
