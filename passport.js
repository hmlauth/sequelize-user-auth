let { getUser } = require('./helperFunctions');
const passport = require('passport');
const passportJWT = require('passport-jwt');

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
// JwtStrategy is a constructor function or class
let JwtStrategy = passportJWT.Strategy;
// console.log('JwtStrategy', JwtStrategy);

// initalize a jwtOptions object
// jwtOptions will contain both the jwt and secret
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// set secretOrKey property equal to secret
jwtOptions.secretOrKey = process.env.SECRET;

// lets create our strategy for web token
// SYNTAX: new JwtStrategy(options, verify)
let strategy = new JwtStrategy(jwtOptions, 
// _verify function    
function(jwt_payload, done) {
    console.log('payload received', jwt_payload);
    let user = getUser({ id: jwt_payload.id });
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }
  
  );
  // use the strategy
  passport.use(strategy);

  module.exports = {
      passport,
      jwtOptions
  };