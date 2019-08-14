const db = require("../models");
let { getUser } = require('../helperFunctions');
const { passport, jwtOptions } = require('../passport');
console.log(passport);
const { _strategies: { jwt }} = passport;
// console.log('verify', passport._strategies.jwt._verify());

module.exports = (app) => {
    // add a basic route
    app.get('/', function(req, res) {
        res.json({ message: 'Express is up!' });
    });

    app.post('/register', (req, res) => { 
        const { name, password } = req.body;
        db.User.create({name, password})
        .then(dbUser => res.json( {dbUser, msg: 'Registration successful!'} ))
    });

    app.get('/users', (req, res) => {
        db.User.findAll()
        .then(dbUsers => res.json(dbUsers))
    })

    app.post('/login', async (req, res) => {
        const { name, password } = req.body;
        if ( name && password ) {
            let user = await getUser({ name, password });
            
            if (!user) {
                res.status(401).json({msg: 'No such user exists.', user})
            }

            // what is payload?
            let payload = { id: user.id };
            let token = jwt._verify(payload, jwtOptions.secretOrKey) 
            console.log('\nTOKEN\n', token)
            res.json( {msg: 'ok', token: token })

        } else {
            res.status(401).json({ msg: 'Password is incorrect' });
        }
    })

}