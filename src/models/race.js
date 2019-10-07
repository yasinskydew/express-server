const mongoose = require('mongoose')
const User = require('../models/user')
const Stage = require('../models/stage')
const raceSchema = new mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    stage: {
       type: mongoose.Schema.Types.ObjectId,
       required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
     }
})

raceSchema.statics.findByCredentials = async (race) => {
    const user = await User.findById(race.user)
    const stage = await Stage.findById(race.stage)
    if(user && stage){
        return race
    } else {
        return undefined
    }
       
}

const Race = mongoose.model('Race', raceSchema)
module.exports = Race
