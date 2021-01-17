const express = require('express')

const passport = require('passport')

const TestLocation = require('../models/location-test')

const customErrors = require('./../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('./../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.post('/locations', requireToken, (req, res, next) => {
  // the owner of the new location will be the current user's id
  req.body.location.owner = req.user.id

  TestLocation.create(req.body.location)
    // respond to successful `create` with status 201 and JSON of new "location"
    .then(location => {
      res.status(201).json({ location: location.toObject() })
    })
    // if an error occurs, move onto the error handler
    // the error handler needs the error message and the `res` object
    // so that it can send an error message back to the client
    .catch(next)
})

router.get('/locations', requireToken, (req, res, next) => {
  TestLocation.find()
    .then(locations => {
      // `locations` will be an array of Mongoose documents
      // in order to convert each one to a Plain Old Java Object,
      // apply `.toObject` to each one using `.map`
      return locations.map(location => location.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(locations => res.status(200).json({ locations: locations }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

router.get('/locations/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  TestLocation.findById(req.params.id)
    .then(handle404)
    // if `findById` is successful, respond with 200 and "location" JSON
    .then(location => res.status(200).json({ location: location.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

router.patch('/locations/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.location.owner

  TestLocation.findById(req.params.id)
    .then(handle404)
    .then(location => {
      requireOwnership(req, location)
      return location.updateOne(req.body.location)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
