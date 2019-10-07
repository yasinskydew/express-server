const Race = require('../models/race');
const League = require('../models/league');
const Stage = require('../models/stage');
const User = require('../models/user');


class RaceController {
    constructor(){}
    getRaces = async (req, res) => {
        try {
            res.status(200).send(await Race.find({}))
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    addRace = async (req, res) => {
        try {
            const race = new Race(req.body) 
            const stageId = race.stage;
            const userId = race.user;
            const stage = await Stage.findOne(stageId)
            const user = await User.findOne(userId)
            if(!stage || !user){
                throw new Error('Unknown user or stage')
            }
            race.save()
            res.status(201).send(race)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    updateRace = async (req, res) => {
        try {
            res.status(201).send(await Race.findByIdAndUpdate(req.params.id, req.body))
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    deleteRace = async (req, res) => {
        try {
            res.send(await Race.remove({_id: req.params.id}))
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    getRaceId = async (req, res) => {
        try {
            res.send(await Race.findById(req.params.id))
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    getRacesWithStage = async (req, res) => {
        const season = req.params.season              
        try {
            const result = await League.aggregate([
                {$match: {season}},
                {
                    $lookup: {
                        from: "stages",
                        localField: "_id",
                        foreignField: "league",
                        as: "league-stage"
                    }
                },
                {$unwind: "$league-stage"},
                {
                    $lookup: {
                        from: "races",
                        localField: "league-stage._id",
                        foreignField: "stage",
                        as: "race-stage"
                    }
                },
                {$unwind: "$race-stage"}
            ])
            res.send(result)
        } catch (e) {
            res.status(400).sendsend({error: e.message})
        }
    }
}

module.exports = RaceController;
