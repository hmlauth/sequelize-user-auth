const uuid = require('uuid/v4');
const colors = require('../utils/colors');
const { Users } = require("../models");
let { getUser } = require('../helperFunctions/helperFunctions.js');
const { hashPassword, checkPassword } = require('../utils/passwordService');
const { createToken, isValidToken } = require('../utils/tokenService');
const cookieOptions = {
  expires: new Date(Date.now() + 900000),
  httpOnly: true,
  // secure: true, on deployment for https
  signed: true
};

module.exports = {
  async testIt(req, res) {
    try {
      res.json({ message: 'Express is up!' });
    } catch (err) {
      if (err) throw err
    }
  },

  async getUsers(req, res) {
    try {
      Users.findAll()
        .then(dbAllUsers => res.json(dbAllUsers))
    } catch (err) {
      if (err) throw err;
    }
  },

  async register(req, res) {
    console.log('you hit the register in route\n', req.body);
    const { password, username } = req.body;
    try {
      // What we are doing here is requiring a package `uuid` which creates a unique id for our newUser object (ex: 'ed13a81d-1891-4cbc-960b-ab366307765a')
      // Then, we use our `hashPassword` middleware function and pass our password from the req.body.

      let newUser = {
        uuid: uuid(),
        username,
        password,
        hashPassword: await hashPassword(password)
      };

      console.log(newUser);

      // We then push our `newUser` to our `dbUsers.json file/array`
      // Then, send a status code to our client and redirect to our `/users/all route`.
      Users.create(newUser);

      let token = await createToken(newUser);
      console.log('token'.silly, token);

      res
        .cookie('token', token, cookieOptions)
        .status(200)
        .redirect('/users/all');

    } catch (err) {
      if (err) throw err;
    }
  },

  async login(req, res) {
    console.log('you hit the login route', req.body);
    const { username, password } = req.body;
    try {
      console.log(Users);
      Users.findAll({where: {username}})
      .then(async dbUser => {
        console.log('dbUser'.verbose, dbUser);

        if (dbUser) {

          let isMatch = await checkPassword(password, dbUser.hashedPassword);
          console.log('isMatch'.verbose, isMatch);

          let token = await createToken(dbUser);
          console.log('token'.verbose, token);

          res.cookie('token', token, cookieOptions);

          if (isMatch) {
            res.status(200).redirect('/users/authorized');
          } else {
            res.send('sorry password did not match');
          }
        } else {
          res.send('sorry username does not match');
        }
      })
    } catch (err) {
      if (err) throw err;
    }
  },

  async logout(req, res) {
    console.logout('you hit the logout in route');
    try {
      res.clearCookie('token').redirect('/users/all');
    } catch (err) {
      if (err) throw err;
    }
  },

  async cookieCheck(req, res) {
    const { token } = req.signedCookies;
    if (token) {
      try {
        let {user: { username, hashedPassword }} = await isValidToken(token);
      let user = Users.find(user => user.username === username);
      res.send({username: user.username, password: hashedPassword});
      } catch (err) {
        if (err) throw err;
      }
    } else {
      res.send({ message: 'Sorry your token has expired.' });
    }
  },

  async authorized(req, res) {
    res.send('users/authorized redirect hit')
  }
}
