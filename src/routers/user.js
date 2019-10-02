const express = require('express')
const CrudController = require('../controllers/crud-controller')
const UserController = require('../controllers/user-controller')
const crud_controller = new CrudController()
const user_controller = new UserController()

const router = new express.Router()

// import models
const User = require('../models/user');
router.get('/users/race/:login', user_controller.getUserWithRaces(User))
router.get('/users/league/:login', user_controller.getUserWithLeague(User))

// User router
router.get('/users', crud_controller.getData(User))
router.post('/users', crud_controller.addData(User))
router.put('/users/:id', crud_controller.updateData(User))
router.delete('/users/:id', crud_controller.deleteData(User))


router.get('/users/:id', crud_controller.getDataId(User))
router.post('/users/login', user_controller.login(User))
// router.get('/users/with-league', user_controller.getUserWithLeagues)


module.exports = router

