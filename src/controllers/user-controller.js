class UserController {
    constructor(){}
    login = (User) => async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.login, req.body.password)  
            res.send(user)  
        } catch (e) {
            res.status(400).send(e)
        }
    }

    getUserWithRaces = (User) => async (req, res) => {
        const login = req.params.login              
        try {
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
            res.send(result)
        } catch (e) {
            res.status(400).send(e.message)
        }
    }
    getUserWithLeague = (User) => async (req, res) => {
        const login = req.params.login              
        try {
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
            res.send(result)
        } catch (e) {
            res.status(400).send(e.message)
        }
    }
}

module.exports = UserController;
