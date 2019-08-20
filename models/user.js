module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define('Users', {
        uuid: {
          type: DataTypes.STRING,
          allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hashPassword: {
          type: DataTypes.STRING,
        }
    })

    return Users

}
