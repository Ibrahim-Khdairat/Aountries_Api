const express = require("express");
const router = express.Router()

router.use('/setAllCountries', require('./setCountries'))
router.use('/getAllCountries', require('./getAllCountries'))
router.use('/getCountry', require('./getCountry'))
router.use('/getCurrencies', require('./GetCurrencies'))
router.use('/groupCountries', require('./groupCountries'))
router.use('/download', require('./downloadJSON'))
module.exports = router;