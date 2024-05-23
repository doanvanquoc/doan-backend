const express = require('express')
const controller = require('../controllers/auth')

const router = express.Router()

router.post('/register', controller.register)
router.post('/login', controller.login)

module.exports = router