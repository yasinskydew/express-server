const service = require('../services/league-service')
class LeagueController {
    constructor(){}
    addLeague = async (req, res) => {
        try {
            const result = service.add(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    getLeague = async (req, res) => {
        try {
            const result = await service.get()
            res.status(200).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    } 
    updateLeague = async (req, res) => {
        try {
            const result = await service.update(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send(e)
        }
    }
    deleteLeague = async (req, res) => {
        try {
            const result = await service.del(req) 
            res.send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    getLeagueId = async (req, res) => {
        try {
            const result = await service.delById(req) 
            res.send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
}
module.exports = LeagueController;
