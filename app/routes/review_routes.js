const express = require('express')
const Location = require('../models/location')
const handle404 = require('../lib/custom_errors')
// create our router
const router = express.Router()
// Show & Index can be done, by fetching a location
// CREATE
router.post('/reviews', (req, res, next) => {
  // extract the review from the incoming request's data (req.body)
  const reviewData = req.body.review
  // extract the location's id
  const locationId = reviewData.locationId
  Location.findById(locationId)
    .then(handle404)
    .then(location => {
      // Add a new review to our reviews subdocument array
      location.reviews.push(reviewData)
      // save the location, so our new review is saved
      return location.save()
    })
  // finally respond with a status of 201 created and the location that
  // includes our newly added review
    .then(location => res.status(201).json({ location }))
  // if an error occurs, go to the next middleware (which is the error handler)
    .catch(next)
})
router.delete('/reviews/:reviewId', (req, res, next) => {
  // extract the reviewId
  const reviewId = req.params.reviewId
  // extract the locationId
  const locationId = req.body.review.locationId
  Location.findById(locationId)
    .then(handle404)
    .then(location => {
      // remove the review from the restaurant's reviews subdocument array
      location.reviews.id(reviewId).remove()
      // save the review's parent document (location) to ensure it is deleted
      return location.save()
    })
    // respond with the status code 204 No Content (since the review was deleted)
    .then(() => res.sendStatus(204))
    // .then(() => res.status(200).send('Successfully Deleted'))
    .catch(next)
})
// Update
router.patch('/reviews/:reviewId', (req, res, next) => {
  // extract the reviewId
  const reviewId = req.params.reviewId
  // extract the review from the incoming request's data (req.body)
  const reviewData = req.body.review
  // extract the locationId
  const locationId = req.body.review.restaurantId
  Location.findById(locationId)
    .then(handle404)
    .then(location => {
      // find the review whose id is reviewId inside of the reviews subdocument array
      const review = location.reviews.id(reviewId)
      // set the review subdocument's data to the incoming data (reviewData)
      review.set(reviewData)
      // save the review's parent document (location) so the review is saved
      return location.save()
    })
    // respond with a successful 204 No Content
    .then(() => res.sendStatus(204))
    // respond with the updated data
    // .then(location => res.json({ location }))
    .catch(next)
})
// export the router
module.exports = router
