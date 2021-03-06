const express = require('express');

const router = express.Router();

const controllers = require('../controllers');
const { errorHandler } = require('../middleware');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Surf Shop' });
});

/* ========== User routes. ========== */

// Register.
router.get('/register', (req, res) => {
  res.send(`${req.method}: ${req.path}`);
});

router.post('/register', errorHandler(controllers.postRegister));

// Login
router.get('/login', (req, res) => {
  res.send(`${req.method}: ${req.path}`);
});

router.post('/login', controllers.postLogin);

router.get('/logout');

// Profile.
router.get('/profile', (req, res) => {
  res.send(`${req.method}: ${req.path}`);
});

router.put('/profile/:user_id', (req, res) => {
  res.send(`${req.method}: ${req.path}`);
});

// Forgot password.
router.get('/forgot', (req, res) => {
  res.send(`${req.method}: ${req.path}`);
});

router.put('/forgot', (req, res) => {
  res.send(`${req.method}: ${req.path}`);
});

// Reset password.
router.get('/reset/:token', (req, res) => {
  res.send(`${req.method}: ${req.path}`);
});

router.put('/reset/:token', (req, res) => {
  res.send(`${req.method}: ${req.path}`);
});

module.exports = router;
