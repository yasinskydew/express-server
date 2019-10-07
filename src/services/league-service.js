const League = require('../models/league');
const add = function (req) {
    const league = new League(req.body) 
    league.save()
    return league    
}

const get = async function(){
    return await League.find({})
}

const del = async function(req){
    return League.findOneAndRemove({_id: req.params.id});
}

const update = async function(req){
    return await League.findByIdAndUpdate(req.params.id, req.body)
}

const getById = async function(req) {
    return await League.findById(req.params.id)
}

module.exports = {
    add,
    get,
    del,
    update,
    getById
}