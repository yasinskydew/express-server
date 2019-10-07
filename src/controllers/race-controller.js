const service = require('../services/race-service')
class RaceController {
    constructor(){}
    getRaces = async (req, res) => {
        try {
            const result = service.get()
            res.status(200).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    addRace = async (req, res) => {
        try {
            const result = await service.add(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    updateRace = async (req, res) => {
        try {
            const result = await service.update(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    deleteRace = async (req, res) => {
        try {
            const result = await service.del(req)
            res.send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    getRaceId = async (req, res) => {
        try {
            const result = await service.getById(req)
            res.send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    getRacesWithStage = async (req, res) => {
        try{
            const result = service.getStage(req)
            res.send(result)
        } catch (e) {
            res.status(400).sendsend({error: e.message})
        }
    }
}

module.exports = RaceController;
