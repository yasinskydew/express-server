const express = require('express')
const StageController = require('../controllers/stage-controller')
const stage_controller = new StageController()
const router = new express.Router()
const admin = require('../middleware/admin')


// Stage router
router.get('/', admin,  stage_controller.getStage)
router.get('/:id', admin,  stage_controller.getStageId)
router.post('/', admin,  stage_controller.addStage)
router.put('/', admin,  stage_controller.updateStage)
router.delete('/:id', admin,  stage_controller.deleteStage)

module.exports = router

