const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')
const { checkUsernameFree } = require('./auth-middleware')

router.post('/register', checkUsernameFree, async (req, res, next) => {
  const { username, password } = req.body
  try {
    const hash = bcrypt.hashSync(password, 8)
    const user = { username, password: hash }
    const result = await Users.add(user)
    res.status(201).json({
      user_id: result.user_id,
      username: result.username
    })
  } catch (error) {
    next(error)
  }
})
/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */

router.post('')
/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */

router.get('')
/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

 
module.exports = router
