const mongoose = require('mongoose')
const Race = require('../models/race')
const League = require('../models/league')
const stageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coords: {
        type:[Number],
        required: true
    },
    league: {
        type:mongoose.Schema.Types.ObjectId,
        required: true
    }
})

stageSchema.statics.findByCredentials = async (stage) => {
    const result = await League.findById(stage.league)
    if(result){
        return stage
    } else {
        return undefined
    }  
}

stageSchema.pre('findOneAndRemove', async function (next) {
    const id = this._conditions._id
    await Race.remove({stage: id}).exec();
    next();
})

const Stage = mongoose.model('Stage', stageSchema)
module.exports = Stage