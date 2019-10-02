const mongoose = require('mongoose')
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
        ref: 'League',
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


const Stage = mongoose.model('Stage', stageSchema)
module.exports = Stage