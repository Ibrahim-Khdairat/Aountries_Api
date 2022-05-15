"use strict";
const axios = require("axios");
const replyBody = require("../common/replyBody");
const { Country } = require("../../models/index");
let allCountries = require("../../../config/allCountries.json");

module.exports = async function (API,apiErrorCode) {
       let checkDB = await Country.findAll()
       
       // if (checkDB.length > 0) {
       //        throw (replyBody.error(`${apiErrorCode}`, "Countries already added"));
       // }

       let dataResponse = await axios.get(API)
              .then( (response) => {                     
                     return response.data;
              })
              .catch(err=>{
                     throw (replyBody.error(`${apiErrorCode}`, err.message));
              });

       return dataResponse;
}