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
const API = process.env.API;
const DB_TABLES = require("../../../models/index");


const apiErrorCode = "SET_COUNTRIES";
router.post("/", setCountries);
//  successf
async function setCountries(req, res) {
      let allCountries = await DB_TABLES["Country"].findAll();
      if (allCountries.length  ==0) {
            const countriesData = await getAPIData(API, apiErrorCode);
            if (countriesData.length > 0) {
                  let response = await setcountriesData(countriesData, apiErrorCode);
                  // res.status(200).json(response);
                  if (response === true) {
                        res.status(201).json(replyBody.done({ message: "Countries Added Successfully" }));
                  }  else {
                        res.status(500).json(replyBody.error(`${apiErrorCode}_ERROR`, "Cannot set data for countries"));
                  }
            }
      } else {
            res.status(409).json(replyBody.done({ message: "Countries Already Added" }));
      }
}
module.exports = router;

