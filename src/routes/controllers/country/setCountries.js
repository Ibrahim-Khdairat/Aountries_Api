"use strict";

/**
 * @description: set the API data to database
 * @api {post} /country/setCountries Set Country
 * @returns: data from API if API is hit successfully otherwise error message
 */

const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");
const getAPIData = require("../../middlewears/getAPIData");
const setcountriesData = require("../../middlewears/setCountriesData");
const verifyJWT = require("../../middlewears/verifyJWT");
const permission = require("../../middlewears/permission");
const API = "https://restcountries.com/v3.1/all";
const { Country } = require("../../../models/index");

const apiErrorCode = "SET_COUNTRIES";
router.post("/", verifyJWT, permission(), setCountries);
//  successf
async function setCountries(req, res) {
      let allCountries = await Country.findAll();
      if (allCountries.length == 0) {
            const countriesData = await getAPIData(API, apiErrorCode);
            if (countriesData.length > 0) {
                  let response = await setcountriesData(countriesData, apiErrorCode);
                  if (response === true) {
                        res.status(200).json(replyBody.done({ data: "Countries Added Successfully" }));
                  } else {
                        res.status(500).json(replyBody.error({ data: response }));
                  }
            }
      } else {
            res.status(200).json(replyBody.done({ data: "Countries Already Added" }));
      }
}
module.exports = router;

