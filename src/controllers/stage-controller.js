const service = require('../services/stage-service')
class StageController {
    constructor(){}
    addStage = async (req, res) => {
        try {
            const result = service.add(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    getStage = async (req, res) => {
        try {
            const result = await service.get()
            res.send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }

    updateStage = async (req, res) => {
        try {
            const result = service.update(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }

    deleteStage = async (req, res) => {
        try {
            const result = del(req)
            res.send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    
    getStageId = async (req, res) => {
        try {
            const result = this.getById(req)
            res.send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
}

module.exports = StageController;
