const express = require('express');

const router = express.Router();

/* ========== Routes. ========== */

// Index.
router.get('/', (req, res) => {
  res.send('Index: /posts');
});

// New.
router.get('/new', (req, res) => {
  res.send('New: /posts/new');
});

// Create.
router.post('/', (req, res) => {
  res.send('Create: /posts');
});

// Show.
router.get('/:id', (req, res) => {
  res.send('Show: /posts/:id');
});

// Edit.
router.get('/:id/edit', (req, res) => {
  res.send('Edit: /posts/:id/edit');
});

// Update.
router.put('/:id', (req, res) => {
  res.send('Update: /posts/:id');
});

// Destroy.
router.delete('/:id', (req, res) => {
  res.send('Delete: /posts/:id');
});

module.exports = router;
