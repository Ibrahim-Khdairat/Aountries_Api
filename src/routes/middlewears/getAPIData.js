"use strict";

/** 
 * Hit the API and get the data
 * @param {String} API - API url
 * @param {String} apiErrorCode - API error code
 * @returns {Array} - API response for all countries
 */
const axios = require("axios");
const fs = require("fs");
const replyBody = require("../common/replyBody");
const { Country } = require("../../models/index");
let allCountries = require("../../../config/allCountries.json");

module.exports = async function (API,apiErrorCode) {
 
       let dataResponse = await axios.get(API)
              .then( (response) => {   
                     return response.data;
              })
              .catch(err=>{
                     throw (replyBody.error(`${apiErrorCode}`, err.message));
              });

       return dataResponse;
}