const { Users } = require("../models");

module.exports.getUser = (obj) => {
    return Users.findOne( {where: obj } )
}
