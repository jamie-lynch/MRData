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
    case 'stats':
      // A stats message means that someone clicked a button. Trigger any events
      // and update scores as required
      break
    case 'stats-reset':
      // Stats reset means someone f*$!ed it and now we need to reset the value
      // quietly. Also reset the score quiety if required.
      break
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
