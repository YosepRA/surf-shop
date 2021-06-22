const express = require('express');

const controllers = require('../controllers/posts');
const { errorHandler } = require('../middleware');

const router = express.Router();

/* ========== Routes. ========== */

// Index.
router.get('/', errorHandler(controllers.postIndex));

// New.
router.get('/new', controllers.postNew);

// Create.
router.post('/', errorHandler(controllers.postCreate));

// Show.
router.get('/:id', errorHandler(controllers.postShow));

// Edit.
router.get('/:id/edit', errorHandler(controllers.postEdit));

// Update.
router.put('/:id', errorHandler(controllers.postUpdate));

// Destroy.
router.delete('/:id', errorHandler(controllers.postDelete));

module.exports = router;
