const User = require('../models/user');

module.exports = {
  postRegister(req, res, next) {
    const { password, ...userData } = req.body;
    const newUser = new User(userData);

    User.register(newUser, password, (err) => {
      if (err) {
        console.log('User register error', err);
        return next(err);
      }

      console.log('User registration successful.');
      res.json({ success: true });
    });
  },
};
