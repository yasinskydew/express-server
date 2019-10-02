class StageController {
    constructor(){}
    addStage = (Stage) => async (req, res) => {
        try {
            const stage = new Stage(req.body) 
            const result = await Stage.findByCredentials(stage)
            if(result.length === 0){
                throw new Error('not league')
            } else {
                result.save()
                res.status(201).send(result)
            }
        } catch (e) {
            res.status(400).send(e.message)
        }
    }
}

module.exports = StageController;
