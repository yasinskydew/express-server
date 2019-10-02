const express = require('express')
const router = require('./routers/export-router')
require('./services/mongoose')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
router.forEach(el => app.use(el))


app.listen(port, () => {
    console.log('server on port ' + port)
})
