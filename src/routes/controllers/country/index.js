const express = require("express");
const router = express.Router()

router.use('/setAllCountries', require('./setCountries'))
router.use('/getAllCountries', require('./getAllCountries'))
router.use('/getCountry', require('./getCountry'))
module.exports = router;