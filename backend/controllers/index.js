var wss = require('../utils/websockets')
var Match = require('../models/match')

const getData = (req, res, next) => {
  Match.get()
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(err => {
      return res.status(500).json({ err: err.message })
    })
}

const updateData = (req, res, next) => {
  let type = req.body.type
  let data = req.body.data

  let update

  switch (type) {
    case 'score':
      // If we get a score update then its a reset otherwise it would have
      // been done via an event
      // The data score look like [1, 0] (or something)
      update = { score: data }
  }

  Match.modify(update)
    .then(() => {
      wss.broadcastChange(type, data)
      return res.status(200).json('ok')
    })
    .catch(err => {
      return res.status(500).json({ error: err.message })
    })
}

module.exports = { getData, updateData }
