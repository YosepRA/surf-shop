const express = require('express');
const multer = require('multer');

const controllers = require('../controllers/posts');
const { errorHandler } = require('../middleware');

const router = express.Router();

/* ========== Multer config. ========== */

const storage = multer.diskStorage({
  destination: 'uploads',
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

/* ========== Routes. ========== */

// Index.
router.get('/', errorHandler(controllers.postIndex));

// New.
router.get('/new', controllers.postNew);

// Create.
router.post(
  '/',
  upload.array('images', 4),
  errorHandler(controllers.postCreate),
);

// Show.
router.get('/:id', errorHandler(controllers.postShow));

// Edit.
router.get('/:id/edit', errorHandler(controllers.postEdit));

// Update.
router.put('/:id', errorHandler(controllers.postUpdate));

// Destroy.
router.delete('/:id', errorHandler(controllers.postDelete));

module.exports = router;
