class LeagueController {
    constructor(){}
    addLeague = (League) => async (req, res) => {
        try {
            const league = new League(req.body) 
            const result = await League.findByCredentials(league)
            if(result.users.length === 0){
                throw new Error('not users')
            } else {
                result.save()
                res.status(201).send(result)
            }
        } catch (e) {
            res.status(400).send(e.message)
        }
    }
}

module.exports = LeagueController;
