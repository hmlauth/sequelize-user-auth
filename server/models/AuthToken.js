module.exports = (sequelize, DataTypes) => {
    const AuthToken = sequelize.define('AuthToken', {
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});

    AuthToken.associate = function({User}) {
        AuthToken.belongsTo(User)
    }

    // Created a class method on AuthToken model for generating instances that can be assigned to users 
    // generates a random 15 character token and
    // associates it with a user
    AuthToken.generate = async function(UserId) {
        if (!UserId) {
          throw new Error('AuthToken requires a user ID')
        }
    
        let token = '';
    
        const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
          'abcdefghijklmnopqrstuvwxyz0123456789';
    
        for (var i = 0; i < 15; i++) {
          token += possibleCharacters.charAt(
            Math.floor(Math.random() * possibleCharacters.length)
          );
        }
        
        // let outcome = AuthToken.create({ token, UserId });
        // console.log('\n OUTCOME', outcome);

        return AuthToken.create({ token, UserId })
      }

    return AuthToken
}