
const express      = require('express')
const morgan       = require('morgan')
const bodyParser   = require('body-parser')
const errorHandler = require('json-error-handler')


const app          = express()
const logger       = console.error.bind(console)


app.set('trust proxy', true)
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }))

app.use(morgan('dev'))


app.use(require('./routes/sys.js')())
app.use(require('./routes/cats.js')())


//app.use(errorHandler(logger))


//crappy error handler here
app.use(function(err, req, res, next) {
  next(err.message)
})


app.logger = logger


module.exports = app
