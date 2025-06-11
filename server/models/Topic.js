const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Basics', 'DOM', 'Advanced', 'ES6+', 'Frameworks', 'Tools', 'Testing', 'Projects']
    },
    learningPoints: [{
      type: String
    }],
    resources: [{
      name: String,
      url: String,
      type: {
        type: String,
        enum: ['article', 'video', 'course', 'book', 'documentation', 'other']
      }
    }],
    order: {
      type: Number,
      required: true
    }
  });
  
  module.exports = mongoose.model('Topic', TopicSchema);