const db = require("../models");
let { userController } = require('../controller');

module.exports = (app) => {
    
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
        
    })

}