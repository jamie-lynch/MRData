var mongoose = require('mongoose')
var Schema = mongoose.Schema
var id
var config = require('../config')

var matchSchema = new Schema({
  stats: [], // [{name: string, display: string, values: [int, int], type: enum('percentage', 'absolute')}]
  teams: [], // [{name: string, shortname: str, colour: hex}]
  score: [], // [int, int]
  lineups: [], // [[{number: int, firstname: string, surname: string}], []]
  events: [] // [{ type: string, display: string, inc: int, stats: string }]
})

matchSchema.statics.create = type => {
  return new Promise((resolve, reject) => {
    var match = new Match({})

    let conf = config[type]

    // set default stats
    let stats = conf.stats.map(stat => {
      return {
        name: stat.name,
        display_name: stat.display,
        type: stat.type,
        values: [stat.default, stat.default],
        increment: stat.increment
      }
    })
    match.stats = stats

    match.teams = conf.teams
    match.score = conf.score
    match.lineups = conf.lineups
    match.events = conf.events

    match
      .save()
      .then(savedMatch => {
        id = savedMatch._id
      })
      .catch(err => {
        return reject(err)
      })
  })
}

matchSchema.statics.get = () => {
  return new Promise((resolve, reject) => {
    Match.findOne({ _id: id })
      .then(match => {
        return resolve(match)
      })
      .catch(err => {
        return reject(err)
      })
  })
}

matchSchema.statics.modify = data => {
  return new Promise((resolve, reject) => {
    Match.update({ _id: id }, data)
      .then(() => {
        return resolve()
      })
      .catch(err => {
        return reject(err)
      })
  })
}

matchSchema.statics.clear = () => {
  return new Promise((resolve, reject) => {
    Match.remove({})
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

var Match = mongoose.model('Match', matchSchema)

module.exports = Match
