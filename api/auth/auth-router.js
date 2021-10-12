const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')
const { checkUsernameFree, checkUsernameExists, checkPasswordLength } = require('./auth-middleware')

router.post('/register', checkUsernameFree, checkPasswordLength, async (req, res, next) => {
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

router.post('/login', checkUsernameExists, async (req, res, next) => {
  const user = { 
    username: req.body.username, 
    password: req.body.password 
  }
  try {
   if (bcrypt.compareSync(user.password, req.user.password)){
     req.session.user = req.user;
     res.status(200).json({
       message: `Welcome ${user.username}`
     })
   } else {
     next({
       status: 401,
       message: "Invalid credentials"
     })
   }  
  } catch (error) {
    next(error)
  }
})

router.get('/logout', (req, res, next) => {//eslint-disable-line
  if(req.session.user){
    req.session.destroy((err) => {
      if(err){
        res.json({
          message: 'you cannot logout'
        })
      }else {
        res.status(200).json({
          message: "logged out"
        })
      }
    })
  } else {
    res.status(200).json({
      message: "no session"
    })
  }
})
 
module.exports = router
