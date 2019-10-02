const express = require('express')
const CrudController = require('../controllers/crud-controller')
const crud_controller = new CrudController()
const StageController = require('../controllers/stage-controller')
const stage_controller = new StageController()
const router = new express.Router()

// import models
const Stage = require('../models/stage');

// Stage router
router.get('/stages', crud_controller.getData(Stage))
router.post('/stages', stage_controller.addStage(Stage))
router.put('/stages', crud_controller.updateData(Stage))
router.delete('/stages', crud_controller.deleteData(Stage))

module.exports = router

