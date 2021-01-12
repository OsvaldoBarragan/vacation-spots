const mongoose = require('mongoose')
const reviewSchema = require('./review')
// create a new location schema
const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  activities: {
    type: String,
    required: true
  },
  cuisines: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  // adds a subdocument array of reviews
  // this creates our one to many relationship where one location has many reviews
  reviews: [reviewSchema],
  // add a one-to-many relationship where one User (owner)
  // can have many restaurants
  owner: {
    // the type of our reference [which are usually ObjectId]
    type: mongoose.Schema.Types.ObjectId,
    // We add a ref schema type option, to say that when we populate the owner
    // we should use the User model
    ref: 'User'
  }
}, {
  // Add the timestamps schema options, so updatedAt and createdAt timestamps
  // are added to the document.
  timestamps: true
  // toObject: {
  //   // remove `hashedPassword` field when we call `.toObject`
  //   transform: (_doc, location) => {
  //     return location
  //   }
  // }
})
// create a model for the Location, using the locationSchema
// then export the Location model so it can be required and used in locationRoutes_routes.js
module.exports = mongoose.model('Location', locationSchema)
