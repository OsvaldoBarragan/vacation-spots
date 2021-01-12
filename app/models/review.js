const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  // options go in the second object
  timestamps: true
})

// exporting the reviewSchema, so that we can use it in our locationSchema
module.exports = reviewSchema
