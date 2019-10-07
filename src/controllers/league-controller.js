const League = require('../models/league');
class LeagueController {
    constructor(){}
    addLeague = async (req, res) => {
        try {
            const league = new League(req.body) 
            league.save()
            res.status(201).send(league)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    getLeague = async (req, res) => {
        try {
            const result = await League.find({})
            res.status(200).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    } 
    updateLeague = async (req, res) => {
        try {
            res.status(201).send(await League.findByIdAndUpdate(req.params.id, req.body))
        } catch (e) {
            res.status(400).send(e)
        }
    }
    deleteLeague = async (req, res) => {
        try {
            const leg = await League.findOneAndRemove({_id: req.params.id});
            res.send(leg)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    getLeagueId = async (req, res) => {
        try {
            res.send(await League.findById(req.params.id))
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
}
module.exports = LeagueController;
