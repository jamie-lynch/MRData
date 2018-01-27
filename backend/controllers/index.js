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
  Match.modify({ stats: data })
    .then(() => {
      wss.broadcastChange(type, data)
      return res.status(200).json('ok')
    })
    .catch(err => {
      return res.status(500).json({ error: err.message })
    })
}

module.exports = { getData, updateData }
