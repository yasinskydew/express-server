const Stage = require('../models/stage');
const League = require('../models/league');
class StageController {
    constructor(){}
    addStage = async (req, res) => {
        try {
            const stage = new Stage(req.body)
            const leagueId = stage.league
            const league = await League.findOne(leagueId)
            if(!league){
                throw new Error('unknown league')
            }
            await stage.save()
            res.status(201).send(stage)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    getStage = async (req, res) => {
        try {
            res.status(200).send(await Stage.find({}))
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }

    updateStage = async (req, res) => {
        try {
            res.status(201).send(await Stage.findByIdAndUpdate(req.params.id, req.body))
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }

    deleteStage = async (req, res) => {
        try {
            const result = await Stage.findOneAndRemove({_id: req.params.id})
            res.send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    
    getStageId = async (req, res) => {
        try {
            res.send(await Stage.findById(req.params.id))
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
}

module.exports = StageController;
