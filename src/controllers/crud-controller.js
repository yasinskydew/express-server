// const User = require('../models/user') // connect to json service
class CrudController {
    constructor(){}

    getData = (Data) => async (req, res) => {
        try {
            res.status(200).send(await Data.find({}))
        } catch (e) {
            res.status(400).send(e)
        }
    }
    addData = (Data) => async (req, res) => {
        const data = new Data(req.body)
        try {
            res.status(201).send(await data.save())
        } catch (e) {
            res.status(400).send(e)
        }
    }
 
    updateData = (Data) => async (req, res) => {
        try {
            res.status(201).send(await Data.findByIdAndUpdate(req.params.id, req.body))
        } catch (e) {
            res.status(400).send(e)
        }
    }
    deleteData = (Data) => async (req, res) => {
        try {
            res.send(await Data.remove({_id: req.params.id}))
        } catch (e) {
            res.status(400).send(e)
        }
    }
    getDataId = (Data) => async (req, res) => {
        try {
            res.send(await Data.findById(req.params.id))
        } catch (e) {
            res.status(400).send(e)
        }
    }
}

module.exports = CrudController;
