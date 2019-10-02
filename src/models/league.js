const mongoose = require('mongoose');
const User = require('../models/user')
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
        ref: 'User',
        required: true
    }
})

leagueSchema.statics.findByCredentials = async (league) => {
    const result = league.users.filter(async el => await User.findById(el))
    if(result){
        return league
    } else {
        return undefined

    }
       
}

const League = mongoose.model('League', leagueSchema)
module.exports = League