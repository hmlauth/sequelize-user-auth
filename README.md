Basics of Authentication using Passport and JWT with Sequelize and MySQL Database (Resource: 
https://medium.com/devc-kano/basics-of-authentication-using-passport-and-jwt-with-sequelize-and-mysql-database-748e09d01bab )

`Passport.js`
> An authentication middleware for Node.js. extremely flexible and modular.
> `passport.js` works with the _concept of strategies_. They basically are a middleware function that a requests runs through before getting to the actual route. If your defined authentication strategy fails, which means that the callback will be called with an error that is not null or false as the second argument, the route will not be called, but an error 401 unauthorized response will be sent.

`JSON Web Token (JWT)`
> An open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

`Sequelize`
> A promise-based Object Relational Mapping for Node.js.

## TO DO:
> Hash password with bcrypt
