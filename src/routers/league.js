const express = require('express')
const CrudController = require('../controllers/crud-controller')
const crud_controller = new CrudController()
const LeagueController = require('../controllers/league-controller')
const league_controller = new LeagueController()
const router = new express.Router()

// import models
const League = require('../models/league');
// League router
router.get('/leagues', crud_controller.getData(League))
router.post('/leagues', league_controller.addLeague(League))
router.put('/leagues/:id', crud_controller.updateData(League))
router.delete('/leagues/:id', crud_controller.deleteData(League))

module.exports = router

