const express = require('express')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const UserController = require('../controllers/user-controller')
const user_controller = new UserController()

const router = new express.Router()

router.delete('/me', auth, user_controller.deleteUser)
router.get('/race/:login',auth, user_controller.getUserWithRaces)
router.get('/registrated/league/:title',auth, user_controller.registratedOnLeague)
router.get('/league/:login',auth, user_controller.getUserWithLeague)


// User router
router.get('/', admin,  user_controller.getUser)
router.post('/', user_controller.addUser)
router.post('/login', user_controller.login)
router.get('/me',auth, user_controller.profile)
router.post('/logout',auth, user_controller.logout)
router.put('/:id', admin, user_controller.updateUser)
router.get('/:id', admin, user_controller.getUserId)
module.exports = router

