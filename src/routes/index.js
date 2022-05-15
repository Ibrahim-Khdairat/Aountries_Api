const express = require("express");
const router = express.Router()

router.use('/country', require('./controllers/country/index'))
router.use('/auth', require('./controllers/auth/index'))

module.exports = router