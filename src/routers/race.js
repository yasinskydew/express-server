const express = require('express')
const RaceController = require('../controllers/race-controller')
const race_controller = new RaceController()
const router = new express.Router()
const admin = require('../middleware/admin')


router.get('/league/:season', admin,  race_controller.getRacesWithStage)
router.get('/', admin, race_controller.getRaces)
router.get('/:id', admin, race_controller.getRaceId)
router.post('/', admin, race_controller.addRace)
router.put('/', admin, race_controller.updateRace)
router.delete('/', admin, race_controller.deleteRace)

module.exports = router

