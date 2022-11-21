const db = require('../database');
/*
const login = {
  getPasswordByName: function(username, callback) {
    return db.query('select password from users where username=?', [username], callback);
  },
  getPasswordByEmail: function(email, callback) {
    return db.query('select password from users where email=?', [email], callback);
  },

  getUserByName: function(username, callback) {
    return db.query('select * from users where username=?', [username], callback);
  },
  getUserByEmail: function(email, callback) {
    return db.query('select * from users where email=?', [email], callback);
  },
};*/

userLogin = (username) => {
  const query = "select password from users where username=?";
  return new Promise((resolve, reject) => {
    db.query(query,[username], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

module.exports = {userLogin};