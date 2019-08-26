# Sequelize-Bcrypt-JWT User Authentication
* This tutorial assumes you have both [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) and [Postman](https://www.getpostman.com/downloads/) installed.
* Supplemental installation guidelines provided [here]().

## File Structure
First things first! Create your file structure as follows:
```
.
| auth
|--- auth.js
| config
|--- config.json
| controllers
|--- userController.js
| models
|--- index.js
|--- user.js
| routes
|--- userRoutes.js
| seeds
|--- schema.sql
| utils
|--- tokenService.js
|--- passwordService.js
| .env
| .gitignore
| server.js
```

## Dependencies

Next, in your terminal run `npm init -y`, which will intialize your `package.json`. Next, run the following code in your terminal:
```
npm i bcrypt cookie-parser dotenv express jsonwebtoken logger morgan mysql2 nodemon sequelize uuid
```

Once complete, you should see each of these node packages listed in your `package.json` file under "dependencies" as well as see a `package-lock.json` file and `node_modules` directory.

```
"dependencies": {
  "bcrypt": "^3.0.6",
  "cookie-parser": "^1.4.4",
  "dotenv": "^8.0.0",
  "express": "^4.17.1",
  "jsonwebtoken": "^8.5.1",
  "logger": "0.0.1",
  "morgan": "^1.9.1",
  "mysql2": "^1.6.5",
  "nodemon": "^1.19.1",
  "sequelize": "^5.15.0",
  "uuid": "^3.3.2"
}
```

#### Why these packages?
* [bcrypt](https://www.npmjs.com/package/bcrypt) - For 'password hashing'. We will use the following built-in methods:
  - `.hash( myPlaintTextPassword, SALTROUNDS )` which returns the hashed password as a string.

  - `.compare(myPlaintTextPassword, hashedPassword)` which returns a boolean value based on if the myPlaintTextPassword and hashedPassword 'match'.

* [cookie-parser](https://www.npmjs.com/package/cookie-parser) -
* [dotenv](https://www.npmjs.com/package/dotenv) - To access enviromental variables. When you need to access an environmental variable on you `.env` file, you simply need to include then statement `require('dotenv').config()` at the top of your file.

* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) -
* [logger](https://www.npmjs.com/package/logger) -
* [morgan](https://www.npmjs.com/package/morgan) -
* [mysql2](https://www.npmjs.com/package/mysql) -
* [sequelize](https://www.npmjs.com/package/sequelize)
* [uuid](https://www.npmjs.com/package/uuid) - Create unique user id for new user objects
* [nodemon](https://www.npmjs.com/package/nodemon) -

#### What are "_cookies_"?!
[HTG Explains What's a Browser Cookie](https://www.howtogeek.com/119458/htg-explains-whats-a-browser-cookie/)
> A site's short-term memory
> Cookies are temporary
>




## TO DO:
// TO DO: Create layer of abstraction so we can switch out databases

// For each of my models (which are coupled to the databse), so create a wrapper over the models so if I have a user model....
model abstraction (adapter, wrapper)
// both schema and models exist but they are hidden
// the wrapper selects specific model/schema based on the database of type connection
