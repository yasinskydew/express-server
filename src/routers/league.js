const express = require('express')
const LeagueController = require('../controllers/league-controller')
const league_controller = new LeagueController()
const router = new express.Router()
const admin = require('../middleware/admin')


// League router
router.get('/', admin, league_controller.getLeague)
router.get('/:id', admin, league_controller.getLeagueId)
router.post('/', admin, league_controller.addLeague)
router.put('/:id', admin, league_controller.updateLeague)
router.delete('/:id', admin, league_controller.deleteLeague)

module.exports = router

