// import models
const User = require('../models/user');
const League = require('../models/league');
class UserController {
    constructor(){}
    addUser = async (req, res) => {
        try {
            const user = new User(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({user, token})
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    deleteUser = async (req, res) => {
        try {
            await req.user.remove()
            res.send({response: "successfylly deleting"})
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    updateUser = async (req, res) => {
        try {
            res.status(201).send(await User.findByIdAndUpdate(req.params.id, req.body))
        } catch (e) {
            res.status(400).send(e)
        }
    }
    login = async (req, res) => {      
        try {
            const user = await User.findByCredentials(req.body.login, req.body.password) 
            const token = await user.generateAuthToken()           
            res.send({user, token})  
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    profile = async (req, res) => {
        res.send(req.user)
    }
    logout =  async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token

            })
            await req.user.save()
            res.send()
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    getUser = async (req, res) => {
        try {
            res.status(200).send(await User.find({}))
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    getUserId = async (req, res) => {
        try {
            res.send(await User.findById(req.params.id))
        } catch (e) {
            res.status(400).send(e)
        }
    }

    getUserWithRaces = async (req, res) => {
        const login = req.params.login              
        try {
            const result = await User.aggregate([
                {$match: {login: login}},
                {
                    $lookup: {
                        from: "races",
                        localField: "_id",
                        foreignField: "user",
                        as: "race"
                    }
                }
            ])
            res.send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    getUserWithLeague = async (req, res) => {
        const login = req.params.login   
        try {
            const result = await User.aggregate([
                {$match: {login: login}},
                {
                    $lookup: {
                        from: "leagues",
                        localField: "_id",
                        foreignField: "users",
                        as: "league"
                    }
                }
            ])
            res.send(result)
        } catch (e) {
            res.status(400).send(e.message)
        }
    }
    registratedOnLeague = async (req, res) => {
        const id = req.user._id
        const title = req.params.title
        try {
            const league = await League.findOne({title})
            if(!league){
                throw new Error('unknown league')
            }
            const flag = league.users.every(el => el.toString() !== id.toString())
            if(flag){
                league.users.push(id)
                await league.save()
                res.send({responce: "sucsessfully registrate"})
            } else {
                res.send({responce: "you was registrate"})
            }
            
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
}

module.exports = UserController;
