var mongoose = require('mongoose')
var Schema = mongoose.Schema
var id

var matchSchema = new Schema({
  stats: []
})

matchSchema.statics.create = () => {
  return new Promise((resolve, reject) => {
    var match = new Match({})

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
