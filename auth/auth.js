require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { SECRET } = process.env;
const colors = require('../utils/colors');
const altWrap = function(fn) {
  return function(req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next);
  }
}

//
// get set req.userId if authenticated
//

const Authenticator = altWrap(async (req, res, next) => {
  console.log('\nInside Authenticator!\n'.verbose)
  console.log('req.signedCookies'.verbose, req.signedCookies);
  // cookie has name already and in this case the name of the cookie is authExample
  let { token } = req.signedCookies;
  console.log('token'.verbose, token);

  //
  // don't allow spoofing :)
  //

  req.userId = null;

  if (token && Object.keys(token).length > 0) {
    let { username, password, hashPassword } = jwt.verify(token, SECRET).user;
    let user = Users.findOne({where: {username}});
    let isMatched;

    if(!user) {
      return next();
      // return res.send(404);
    }

    isMatched = await bcrypt.compare(password, hashPassword);

    if (!isMatched) {
      return res.status(404).send('user not found');
    }
    req.userId = user.id;
  }
  next();
});

const Authenticated = (req, res, next) => {
  console.log('Inside Authenticated!'.verbose);
  if(!req.userId) {
    return res.status(401).end();
  }
  next();
}

const NotAuthenticated = (req, res, next) => {
  if (req.userId) {
    return res.status(418).end();
  }
  next();
}

module.exports = {
  Authenticator: Authenticator,
  Authenticated: Authenticated,
  NotAuthenticated: NotAuthenticated
}


// equivalent as altWrap:
// const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
