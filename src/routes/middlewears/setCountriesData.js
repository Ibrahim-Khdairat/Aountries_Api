"use strict";

/**
 * set the data for countries in the database
 * @param {object} data - API response for all countries
 * @param {string} apiErrorCode - API error code
 * @returns {boolean} - true if data is added successfully otherwise error message
 */

const { Country } = require("../../models/index");
const replyBody = require("../common/replyBody");
const ref = require("../../../config/ref.json")

module.exports = async function (data,apiErrorCode) {
      
       let dataObj = {};
       let response;
       try {
              data.forEach(async (item, index) => {
                     for (let key in item) {
                            if (ref.hasOwnProperty(key)) {
                                   dataObj[ref[key].keyDefinition] = item[key];
                            }
                     }
                     await Country.create(dataObj);
                     dataObj = {};
              });
              response = true
       } catch (error) {
              response = error.message;
       }
       return response;
};