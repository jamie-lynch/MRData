var wss = require('../utils/websockets')

const updateData = (req, res, next) => {
  let type = req.body.type
  let data = req.body.data
  wss.broadcastChange(type, data)
  return res.status(200).json('ok')
}

module.exports = { updateData }
