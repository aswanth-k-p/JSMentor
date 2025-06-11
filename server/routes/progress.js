const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Progress = require('../models/Progress');
const Topic = require('../models/Topic');
const { check, validationResult } = require('express-validator');

// @route   GET api/progress
// @desc    Get all progress for current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id })
      .populate('topic', 'title category order');
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/progress
// @desc    Create or update progress
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('topic', 'Topic ID is required').not().isEmpty(),
      check('status', 'Status is required').isIn(['Yet to start', 'Ongoing', 'Completed'])
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { topic, status } = req.body;

    try {
      // Check if topic exists
      const topicExists = await Topic.findById(topic);
      if (!topicExists) {
        return res.status(404).json({ msg: 'Topic not found' });
      }

      // Build progress object
      const progressFields = {
        user: req.user.id,
        topic,
        status,
        lastUpdated: Date.now()
      };
      
      // Add start date if moving to Ongoing
      if (status === 'Ongoing') {
        progressFields.startDate = progressFields.startDate || Date.now();
      }
      
      // Add completion date if Completed
      if (status === 'Completed') {
        progressFields.completionDate = Date.now();
      }

      // Create or update progress
      let progress = await Progress.findOne({ user: req.user.id, topic });
      
      if (progress) {
        // Update
        progress = await Progress.findOneAndUpdate(
          { user: req.user.id, topic },
          { $set: progressFields },
          { new: true }
        ).populate('topic', 'title category');
      } else {
        // Create
        progress = new Progress(progressFields);
        await progress.save();
        progress = await Progress.findById(progress._id).populate('topic', 'title category');
      }

      res.json(progress);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;