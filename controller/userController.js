const db = require("../models");
// console.log(db);

module.exports.getUser = (obj) => {
    return db.User.findOne( {where: obj } )
}