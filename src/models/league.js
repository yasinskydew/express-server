const mongoose = require('mongoose');
const Stage = require('../models/stage');
const Race = require('../models/race');
const leagueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String
    },
    season: {
        type: String,
        required: true,
        enum: ['Winter', 'Spring', "Autumn", "Summer"]
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    }
})

leagueSchema.pre('findOneAndRemove', async function (next) {
    const id = this._conditions._id
    const stages = await Stage.find({league:id})
    stages.forEach( async (element)  => await Race.remove({stage: element._id}).exec());
    await Stage.remove({league: id}).exec();
    next();
})
const League = mongoose.model('League', leagueSchema)
module.exports = League