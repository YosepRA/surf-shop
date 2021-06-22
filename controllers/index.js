const passport = require('passport');

const User = require('../models/user');

module.exports = {
  // User register.
  async postRegister(req, res) {
    const { password, ...userData } = req.body;
    const newUser = new User(userData);

    await User.register(newUser, password);

    res.redirect('/');
  },
  // User login.
  postLogin(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
    })(req, res, next);
  },
  // User logout.
  getLogout(req, res) {
    req.logout();
    res.redirect('/');
  },
};
