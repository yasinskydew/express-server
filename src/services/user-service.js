const League = require('../models/league');
const User = require('../models/user');

const add = async function (req) {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    return {user, token}  
}

const get = async function(){
    return await User.find({})
}

const update = async function(req){
    return await User.findByIdAndUpdate(req.params.id, req.body)
}

const login = async function(req){
    const user = await User.findByCredentials(req.body.login, req.body.password) 
    const token = await user.generateAuthToken()    
    return {user, token}
}

const logout = async function(req){
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token

    })
    await req.user.save()
}

const del = async function(req){
    return await req.user.remove()
}

const getById = async function(req) {
    return await User.findById(req.params.id)
}

const getStage = async function(req){
    const login = req.params.login 
    const result = await User.aggregate([
        {$match: {login: login}},
        {
            $lookup: {
                from: "races",
                localField: "_id",
                foreignField: "user",
                as: "race"
            }
        }
    ])
    return result
}

const getLeague = async function(req){
    const login = req.params.login   
    const result = await User.aggregate([
        {$match: {login: login}},
        {
            $lookup: {
                from: "leagues",
                localField: "_id",
                foreignField: "users",
                as: "league"
            }
        }
    ])
    return result
}

const regLeague = async function(req){
    const id = req.user._id
    const title = req.params.title
    const league = await League.findOne({title})
        if(!league){
            throw new Error('unknown league')
        }
        const flag = league.users.every(el => el.toString() !== id.toString())
        if(flag){
            league.users.push(id)
            await league.save()
            return {responce: "sucsessfully registrate"}
        } else {
            return {responce: "you was registrate"}
        }
}

module.exports = {
    add,
    get,
    update,
    del,
    login,
    logout,
    getById,
    getStage,
    getLeague,
    regLeague
}