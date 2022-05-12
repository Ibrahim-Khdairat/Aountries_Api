const express = require("express");
const router = express.Router()

router.use('/country', require('./controllers/country/index'))

module.exports = router