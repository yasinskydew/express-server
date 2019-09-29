const express = require('express')
const UserController = require('../controllers/user-controller')
const ucontroller = new UserController()
const router = new express.Router()

router.get('/users', ucontroller.getUsers)
router.post('/users', ucontroller.addUser)
router.put('/users', ucontroller.updateUser)
router.delete('/users', ucontroller.deleteUser)

module.exports = router

