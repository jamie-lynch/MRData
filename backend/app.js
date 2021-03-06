var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Match = require('./models/match')

var index = require('./routes/index')
require('dotenv').config()

var app = express()

// connect to db
mongoose.Promise = require('bluebird')
mongoose.connect(process.env.DB_ADDRESS).catch(err => {
  console.error(err)
})

var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
Match.clear().then(() => {
  Match.create('rugby')
})

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// CORS headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use('/', index)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  let errs = {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  }

  // render the error page
  return res.status(err.status || 500).json(errs)
})

module.exports = app
