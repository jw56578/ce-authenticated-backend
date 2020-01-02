const jwt = require('jsonwebtoken')
const users = require('../users');


const logger = (req, res, next) => {
  let dateTime = new Date().toISOString();
  console.log('Logging route:', req.path);
  console.log('Time:', dateTime);
  next();
}

const authenticate = (req, res, next) => {
  let header = req.headers[ 'authorization' ];
  if(!header){
    return res.json({message:'not authorized'});
  }
  header = header.split(' ');
  const token = header[1];

  jwt.verify(token, 'secret', function(err, decoded) {
    if(err) {
      return res.json({message:'not authorized'});
    } else {
      const existing = users.find(u=>u.username === decoded.username);
      if(!existing) {
        return res.json({message:'not authorized'});
      }
      req.user = existing;
      next();
    }
  });
};

module.exports = {
  logger,
  authenticate
}