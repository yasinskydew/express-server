const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// const League = require('../models/league')
const userSchema = new mongoose.Schema({
    login: {
        type: String,
        unique:true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    }
})

userSchema.statics.findByCredentials = async (login, password) => {
    const user = await User.findOne({login})
    if(!user) {
        throw new Error('Unable user')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User