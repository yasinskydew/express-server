const Stage = require('../models/stage');
const League = require('../models/league');

const add = async function (req) {
    const stage = new Stage(req.body)
    const leagueId = stage.league
    const league = await League.findOne(leagueId)
    if(!league){
        throw new Error('unknown league')
    }
    await stage.save()
    return stage    
}

const get = async function(){
    return await Stage.find({})
}

const update = async function(req){
    return await Stage.findByIdAndUpdate(req.params.id, req.body)
}

const del = async function(req){
    return await Stage.findOneAndRemove({_id: req.params.id})
}

const getById = async function(req) {
    return await Stage.findById(req.params.id)
}

module.exports = {
    add,
    get,
    update,
    del,
    getById
}