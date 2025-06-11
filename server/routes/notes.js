const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');
const Topic = require('../models/Topic');
const { check, validationResult } = require('express-validator');

// @route   GET api/notes
// @desc    Get all notes for current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
      .populate('topic', 'title')
      .sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/notes/topic/:topicId
// @desc    Get all notes for a specific topic
// @access  Private
router.get('/topic/:topicId', auth, async (req, res) => {
  try {
    const notes = await Note.find({ 
      user: req.user.id,
      topic: req.params.topicId
    }).sort({ updatedAt: -1 });
    
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/notes
// @desc    Add new note
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('topic', 'Topic ID is required').not().isEmpty(),
      check('content', 'Content is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { topic, content } = req.body;

    try {
      // Check if topic exists
      const topicExists = await Topic.findById(topic);
      if (!topicExists) {
        return res.status(404).json({ msg: 'Topic not found' });
      }

      const newNote = new Note({
        user: req.user.id,
        topic,
        content
      });

      const note = await newNote.save();
      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/notes/:id
// @desc    Update note
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      check('content', 'Content is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content } = req.body;

    try {
      let note = await Note.findById(req.params.id);

      if (!note) {
        return res.status(404).json({ msg: 'Note not found' });
      }

      // Make sure user owns the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      note = await Note.findByIdAndUpdate(
        req.params.id,
        { 
          content,
          updatedAt: Date.now()
        },
        { new: true }
      );

      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/notes/:id
// @desc    Delete note
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Make sure user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Note.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
