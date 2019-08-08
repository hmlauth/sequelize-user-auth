const express = require('express');
const bcryptjs = require('bcryptjs'); // has passwords to keep db clean and protect sensitive data
const router = express.Router();

const { User } = require('../models');

// routes will go here.
// As a rule of thumb, think skinny controllers, fat models. We should strive to put as much logic as we can in the models and leave the routing to the controllers.

// 4 basic routes: register, login, logout, me
// REGISTER
router.post('/register', async (req, res) => {

    console.log(req.body);

    const hash = bcryptjs.hashSync(req.body.password, 10);

    try {
        let user = await User.create(
            Object.assign(
                req.body, 
                {password: hash}
            )
        );
        console.log('***', user);
        // data will be an object with the user and its authToken  
        let data = await user.authorize();
        console.log(`data:`, data);
        // send back the new user and auth token to the
        // client { user, authToken }
        return res.json(data);

    } catch (err) {
        return res.status(400).send(err)
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // check if username/password are missing
    // if yes, send status code 400 indicating bad request
    if ( !username || !password ) {
        return res.status(400).send('Request missing username and password.');
    }

    try {
        let user = await User.authenticate(username, password);
        user = await user.authorize();
        return res.json(user);
    } catch (err) {
        return res.status(400).send('Invalid username or password')
    }
})

// LOGOUT
router.delete('/logout', async (req, res) => {
    console.log(req);
    console.log(req.body);
    // because the logout request needs to be send with
    // authorization we should have access to the user
    // on the req object, so we will try to find it and
    // call the model method logout
    const { user, cookies: { auth_token: authToken } } = req
    
    // we only want to attempt a logout if the user is
    // present in the req object, meaning it already
    // passed the authentication middleware. There is no reason the authToken should be missing at this point, check anyway
    if (user && authToken) {
        await req.user.logout(authToken);
        return res.status(204).send()
    }

    // if the user missing, the user is not logged in, hence we
    // use status code 400 indicating a bad request was made
    // and send back a message
    return res.status(400).send(
        { errors: [{ message: 'not authenticated' }] }
    );

});

// ME - Get currently loggin in user
router.get('/me', (req, res) => {
    if (req.user) {
      return res.send(req.user);
    }
    res.status(404).send(
      { errors: [{ message: 'missing auth token' }] }
    );
});

module.exports = router;