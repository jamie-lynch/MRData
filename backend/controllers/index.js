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

  let updateObj = {}

  if (type === 'stats') {
    updateObj = { stats: data }
  } else if (type === 'team') {
    updateObj = {
      teams: data.teams,
      lineups: data.lineups
    }
  } else {
    let eventType = data.type
    switch (eventType) {
      case 'score':
        updateObj = {
          [`score.${data.data.team_index}`]: data.data.score
        }
        break
      default:
        break
    }
  }

  Match.modify(updateObj)
    .then(() => {
      wss.broadcastChange(type, data)
      return res.status(200).json('ok')
    })
    .catch(err => {
      return res.status(500).json({ error: err.message })
    })
}

module.exports = { getData, updateData }
