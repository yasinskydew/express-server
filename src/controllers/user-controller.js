const User = require('../models/user') // connect to json service
// const User = require('../models/mUser') // connect to mongo service
class UserController {
    constructor(){}
    getUsers = async (req, res) => {
        try {
            res.status(200).send(await User.find({}))
        } catch (e) {
            res.status(400).send(e)
        }
    }
    addUser = async (req, res) => {
        const user = new User(req.body)
        try {
            res.status(201).send(await user.save())
        } catch (e) {
            res.status(400).send(e)
        }
    }
 
    updateUser = async (req, res) => {
        try {
            res.status(201).send(await User.findByIdAndUpdate(req.body._id, {name: req.body.name, surname: req.body.surname}))
        } catch (e) {
            res.status(400).send(e)
        }
    }
    deleteUser = async (req, res) => {
        try{
            res.send(await User.remove({_id: req.body._id}))
        } catch (e) {
            res.status(400).send(e)
        }
    }
}

module.exports = UserController;
