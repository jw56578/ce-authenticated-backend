const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const users = require('../users');

const saltRounds = 10

const signup = (req, res) => {
  const { username, password } = req.body
  let sql = "INSERT INTO usersCredentials (username, password) VALUES (?, ?)"
  if(!username || !password){
    return res.json({message:'Invalid usrename or password authorized'});
  }
  const existing = users.find(u=> u.username === username);
  if(existing){
    return res.json({message:'Username not available'});
  }

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if(err){
      return res.json(err)
    }
    users.push({password:hash,username});
    return res.json({message:'Sign-up successful'});
  })
}

const login = (req, res) => {
  const { username, password } = req.body;
  const existing = users.find(u=> u.username === username);
  if(!existing){
    return res.json({message:'Username or password invalid'});
  }
  bcrypt.compare(password, existing.password)
    .then(result => {
      if (!result) return res.status(400).send({message:'Username or password invalid'})
      const token = jwt.sign(existing, 'secret')
      res.json({
        message: 'Login successful',
        token
      })
    })
}

module.exports = {
  signup,
  login
}