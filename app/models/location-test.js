const mongoose = require('mongoose')
const reviewSchema = require('./review')

const testLocationSchema = new mongoose.Schema({
  name: {
    // require name to use a string type
    type: String,
    required: true
  },
  country: {
    // require country to use a string type
    type: String,
    required: true
  },
  activities: {
    // require activities to use a string type
    type: String,
    required: true
  },
  cuisines: {
    // require cuisines to use a string type
    type: String,
    required: true
  },
  imageUrl: {
    // require imageUrl to use a string type
    type: String,
    required: true
  },
  reviews: [reviewSchema],
  owner: {
    // the reference type
    type: mongoose.Schema.Types.ObjectId,
    // when the owner is populated, use the User model
    ref: 'User',
    required: true
  }
}, {
  // timestamps will give you the createdAt and
  // updatedAt in the document
  timestamps: true
})

// create a model for the TestLocation
// export the TestLocation model so it can be used in it's routes file
module.exports = mongoose.model('TestLocation', testLocationSchema)
