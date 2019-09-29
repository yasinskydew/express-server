const uniqid = require('uniqid');
const service = require('../services/json-service')
class User {
    constructor(obj){
        this._id = obj._id || uniqid()
        this.name = obj.name || null
        this.surname = obj.surname || null
    }
    save() {
        return new Promise((resolve, reject) => {
            resolve(service.addUserStore({
                _id: this._id,
                name: this.name,
                surname: this.surname
            }))
        });
    }
    static find() {
        return new Promise((resolve, reject) => {
            resolve(service.getUsersStore())
          });  
    }
    static findByIdAndUpdate(id, obj){
        return new Promise((resolve, reject) => {
            resolve(service.updateUserStore(id, obj))
          }); 
    }
    static remove(obj) {
        return new Promise((resolve, reject) => {
            resolve(service.deleteUserStore(obj._id))
          }); 
    }
}
module.exports = User




