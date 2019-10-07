const express = require('express')
const router = require('./routers/export-router')
require('./services/mongoose')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use('/users', router.userRouter)
app.use('/leagues', router.leagueRouter)
app.use('/races', router.raceRouter)
app.use('/stages', router.stageRouter)

app.listen(port, () => {
    console.log('server on port ' + port)
})
