const express = require('express')

const router = express.Router()

const Location = require('./../models/location')

// const handle404 = require('./../lib/custom_errors')

// Create POST
router.post('/locations', (req, res, next) => {
  const locationData = req.body.location
  Location.create(locationData)
    .then(location => res.status(201).json({ location: location }))
    .catch(next)
})

router.get('/locations', (req, res, next) => {
  // find all of the locations
  Location.find()

    // this will replace the owner id with a document that uses the
    // model specified in "ref"
    .populate('owner')
    // // populate everything except the hashed password
    // .populate('owner', '-hashedPassword')
    // // populate only the _id and email
    // .populate('owner', '_id email')

    // respond with the locations
    .then(locations => res.status(200).json({ locations: locations }))
    // if an error occurs, call the next middleware (the error handler middleware)
    .catch(next)
})

// router.get('/locations/:id', (req, res, next) => {
//   const id = req.params.id
//   Location.findById(id)
//   // this will replace the owner id with a document that uses the
//   // model specified in "ref"
//     .populate('owner')
//     .then(handle404)
//     .then(location => res.status(200).json({ location }))
//     .catch(next)
// })
//
// router.patch('/locations/:id', (req, res, next) => {
//   const id = req.params.id
//   const userData = req.body.location
//   Location.findById(id)
//     .then(handle404)
//     .then(location => location.updateOne(userData))
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })
//
// router.delete('/locations/:id', (req, res, next) => {
//   const id = req.params.id
//   Location.findById(id)
//     .then(handle404)
//     .then(location => location.deleteOne())
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })

module.exports = router
