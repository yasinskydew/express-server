const express = require('express')
const userRouter = require('./routers/user')
require('./services/mongoose')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('server on port ' + port)
})
