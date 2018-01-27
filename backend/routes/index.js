var express = require('express')
var router = express.Router()
var controller = require('../controllers')

router.get('/get-data', controller.getData)

router.post('/update-data', controller.updateData)

module.exports = router
