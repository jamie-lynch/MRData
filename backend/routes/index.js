var express = require('express')
var router = express.Router()
var controller = require('../controllers')

router.post('/update-data', controller.updateData)

module.exports = router
