const router = require('express').Router();
const store = require('../db/store')

router.get('/notes', (req, res) => {
  try {
    store
    .getNotes()
    .then(notes => {
        res.json(notes);
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get notes' });
  }
});

router.post('/notes', (req, res) => {
  try {
    console.log(req.body)
    store
    .addNote(req.body)
    .then(note => {
        res.json(note);
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save note' });
  }
});

router.delete('/notes/:id', (req, res) => {
  try {
    store.removeNote(req.params.id)
    .then(() => res.json({ok: true}));
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;
