const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/myRoutes')

app.use(router);

app.listen(port, () => console.log(`Our app listening on port ${port}!`))


