const { findBy } = require('../users/users-model')

function restricted(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    next({
      status: 401,
      message: "You shall not pass!"
    })
  } 
}

async function checkUsernameFree(req, res, next) {
  const { username } = req.body
  try {
    const user = await findBy({ username: username })
  if(user.length){
    next({
      status: 422,
      message: "Username taken"
    })
  } else {
  next()
  } 
}catch (error) {
    next(error)
  }
}


/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
async function checkUsernameExists(req, res, next) {
  try {
    const { username } = req.body;
    const user = await findBy({ username: username }); 
    if (user.length) {
      req.user = user[0];
      next();
    } else {
      next({ 
        status: 401, 
        message: "Invalid credentials" 
      });
    }
  } catch (err) {
    next(err);
  }
}

function checkPasswordLength(req, res, next) {
  if (req.body.password && req.body.password.length >= 3) {
    next();
  } else {
    next({
      status: 422,
      message: "Password must be longer than 3 chars"
    })
  }
}

module.exports = {
  checkPasswordLength,
  restricted,
  checkUsernameExists,
  checkUsernameFree
}
