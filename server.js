const { config } = require('dotenv');
const colors = require('./utils/colors');
const express = require('express');
const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const jwt = require('jsonwebtoken');
const { SECRET, PORT } = process.env;
const Authenticator = require('./auth/auth.js').Authenticator;
const db = require('./models'); // required for sequelize db connection

config({ debug: process.env.DEBUG }); // what does this object do in config?

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(SECRET));
app.use(Authenticator);

// USE ROUTES
app.use('/users', userRoutes);


db.sequelize
  .sync({ force: false })
  .then( () => {
    app.listen(PORT, () =>
      console.log(` \nDatabase connection established! \nApp running on http://localhost:${PORT}`.verbose)
    );
  })
