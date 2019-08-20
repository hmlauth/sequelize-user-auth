const bcrypt = require('bcrypt');
const { SALTROUNDS } = process.env;

module.exports = {
  hashPassword: async myPlaintTextPassword => {
    try {
      let hash = await bcrypt.hash(myPlaintTextPassword, parseInt(SALTROUNDS));
      return hash;
    } catch (err) {
      if (err) throw err;
    }
  },
  checkPassword: async (myPlaintTextPassword, hash) => {
    try {
      let isMatched = await bcrypt.compare(myPlaintTextPassword, hash);
      return isMatched;
    } catch (err) {
      if (err) throw err;
    }
  }
};
