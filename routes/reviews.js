const express = require('express');

const router = express.Router({ mergeParams: true });

/* ========== Routes. ========== */

// Index.
router.get('/', (req, res) => {
  res.send('Index: /reviews');
});

// Create.
router.post('/', (req, res) => {
  res.send('Create: /reviews');
});

// Edit.
router.get('/:review_id/edit', (req, res) => {
  res.send('Edit: /reviews/:review_id/edit');
});

// Update.
router.put('/:review_id', (req, res) => {
  res.send('Update: /reviews/:review_id');
});

// Destroy.
router.delete('/:review_id', (req, res) => {
  res.send('Delete: /reviews/:review_id');
});

module.exports = router;
