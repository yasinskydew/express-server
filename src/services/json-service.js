const fs = require('fs');
const path = require('path')
const store_path = path.join(__dirname, '../store/store.json')
const Joi = require('@hapi/joi');

let _store = JSON.parse(fs.readFileSync(store_path));

const schema = Joi.object({
    _id: Joi.string()
        .required(),
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
 
    surname: Joi.string()
        .min(3)
        .max(20)
        .required()
})
const validData = (obj) => {
    if(schema.validate(obj).error){
        return false
    } else {
        return obj
    }
}
const addUserStore = (obj) => {
    if(validData(obj)){
        _store.push(obj)
        fs.writeFileSync(store_path, JSON.stringify(_store))
        return _store
    } else {
        return 'bad data'
    }  
}

const getUsersStore = () => {
    return _store
}

const deleteUserStore = (id) => {
    _store = _store.filter(element => element._id !== id);
    fs.writeFileSync(store_path, JSON.stringify(_store));
    return _store
}

const updateUserStore = (id, obj) => {
    user = {
        _id: id,
        name: obj.name,
        surname: obj.surname,
    }

    if(validData(user)){
        _store = _store.filter(el => el._id !== id)
        _store.push(user)
        fs.writeFileSync(store_path, JSON.stringify(_store))
        return _store
    } else {
        return 'incorrect user data'
    }  
}


module.exports = {
    addUserStore,
    getUsersStore,
    updateUserStore,
    deleteUserStore
}


