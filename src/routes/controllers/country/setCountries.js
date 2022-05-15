"use strict";

const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");
const getAPIData = require("../../middlewears/getAPIData");
const setcountriesData = require("../../middlewears/setCountriesData");
const verifyJWT = require("../../middlewears/verifyJWT");
const permission = require("../../middlewears/permission");
const API = "https://restcountries.com/v3.1/all";

const apiErrorCode = "SET_COUNTRIES";
router.post("/",verifyJWT,permission("crerate") ,  setCountries);
//  successf
async function setCountries(req, res) {
       const countriesData = await getAPIData(API, apiErrorCode);
       
       if(countriesData.length > 0) {
             let response = await setcountriesData(countriesData , ["name","languages","cca2","ccn3","cca3","currencies","region","latlng"],apiErrorCode);
               if(response === true) {
                     res.status(200).json(replyBody.done({ data: "Countries Added Successfully" }));
               } else {
                     res.status(500).json(replyBody.error({ data: response }));
               }
       }
}
module.exports = router;

