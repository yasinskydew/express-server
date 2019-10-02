class RaceController {
    constructor(){}
    addRace = (Race) => async (req, res) => {
        try {
            const race = new Race(req.body) 
            const result = await Race.findByCredentials(race)
            if(result.length === 0){
                throw new Error('not users or stage')
            } else {
                result.save()
                res.status(201).send(result)
            }
        } catch (e) {
            res.status(400).send(e.message)
        }
    }
    getRacesWithStage = (League) => async (req, res) => {
        const season = req.params.season              
        try {
            const result = await League.aggregate([
                {$match: {season}},
                {
                    $lookup: {
                        from: "stages",
                        localField: "_id",
                        foreignField: "league",
                        as: "league-stage"
                    }
                },
                {$unwind: "$league-stage"},
                {
                    $lookup: {
                        from: "races",
                        localField: "league-stage._id",
                        foreignField: "stage",
                        as: "race-stage"
                    }
                },
                {$unwind: "$race-stage"}
            ])
            res.send(result)
        } catch (e) {
            res.status(400).send(e.message)
        }
    }
}

module.exports = RaceController;
