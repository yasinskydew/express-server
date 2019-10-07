const Race = require('../models/race');
const League = require('../models/league');
const Stage = require('../models/stage');
const User = require('../models/user');

const add = async function (req) {
    const race = new Race(req.body) 
    const stageId = race.stage;
    const userId = race.user;
    const stage = await Stage.findOne(stageId)
    const user = await User.findOne(userId)
    if(!stage || !user){
        throw new Error('Unknown user or stage')
    }
    race.save()
    return race    
}

const get = async function(){
    return await Race.find({})
}

const update = async function(req){
    return await Race.findByIdAndUpdate(req.params.id, req.body)
}

const del = async function(req){
    return await Race.remove({_id: req.params.id})
}

const getById = async function(req) {
    return await Race.findById(req.params.id)
}

const getStage = async function(req){
    const season = req.params.season              
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
    return result
}

module.exports = {
    add,
    get,
    update,
    del,
    getById,
    getStage
}