const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Yet to start', 'Ongoing', 'Completed'],
    default: 'Yet to start'
  },
  startDate: {
    type: Date
  },
  completionDate: {
    type: Date
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Ensure we can't have duplicate progress entries for the same user and topic
ProgressSchema.index({ user: 1, topic: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);
