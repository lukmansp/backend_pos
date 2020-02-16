const { port } = require('./src/configs')
const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')

const mainNavigation = require('./src/routes')

app.listen(port, () => console.log(`\n This server is running on port ${port}`))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', mainNavigation)
