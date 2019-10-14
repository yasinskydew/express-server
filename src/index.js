const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger');
const router = require('./routers/export-router');
const mongoose = require('mongoose');

const options = {
    customJs: '/custom.js'
  };

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

const app = express()
const port = process.env.PORT || 8080
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/users', router.userRouter)
app.use('/leagues', router.leagueRouter)
app.use('/races', router.raceRouter)
app.use('/stages', router.stageRouter)

app.listen(port, () => {
    console.log('server on port ' + port)
})
