require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT || 3000;
const {passport} = require('./passport');

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
userRoutes(app);

const db = require("./models/index");
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize
  // check the databse connection
    .sync({ force: false }) 
    .then(() => console.log('Connection has been established successfully.'))
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening on PORT ${PORT}`);
        });
});


