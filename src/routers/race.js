const express = require('express')
const CrudController = require('../controllers/crud-controller')
const crud_controller = new CrudController()
const RaceController = require('../controllers/race-controller')
const race_controller = new RaceController()
const League = require('../models/league')
const router = new express.Router()

// import models
const Race = require('../models/race');
router.get('/races/league/:season', race_controller.getRacesWithStage(League))
// Race router
router.get('/races', crud_controller.getData(Race))
router.post('/races', race_controller.addRace(Race))
router.put('/races', crud_controller.updateData(Race))
router.delete('/races', crud_controller.deleteData(Race))

module.exports = router

