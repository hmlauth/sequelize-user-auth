const router = require('express').Router();
const { Authenticated, NotAuthenticated } = require('../auth/auth');
const { testIt, getUsers, register, login, logout, authorized } = require('../controllers/userController');
const db = require("../models");

// Matches '/users':

  router.route('/')
    .get(testIt)

  router.route('/all', Authenticated)
    .get(getUsers)

  router.route('/register', NotAuthenticated)
    .post(register)

  router.route('/login', NotAuthenticated)
    .post(login)

  router.route('/logout', Authenticated)
    .delete(logout)

  router.route('/authorized')
    .get(authorized)

module.exports = router;
