"use strict";

/**
 * set the data for countries in the database
 * @param {object} data - API response for all countries
 * @param {string} apiErrorCode - API error code
 * @returns {boolean} - true if data is added successfully otherwise error message
 */

const { Country } = require("../../models/index");
const insertToDB = require("./insertToDB");
const ref = require("../../../config/ref.json")
const fs = require("fs");


module.exports = async function (data, apiErrorCode) {

       let dataObj = {};
       let response;
       try {
              // fs.appendFile(".allCountries.json", "[", error => {
              //        if (error) {
              //               throw (replyBody.error(`${apiErrorCode}_ERROR`, error.message));
              //        }
              // })
              let dataLength = data.length;
              data.forEach(async (country, index) => {

                     // prepare the country object
                     for (let key in country) {
                            if (ref.hasOwnProperty(key)) {
                                   dataObj[ref[key].keyDefinition] = country[key];
                            }
                     }
                     // set data in json file

                     // if (index !== dataLength - 1) {
                     //        fs.appendFile(".allCountries.json", JSON.stringify(dataObj) + ",", error => {
                     //               if (error) {
                     //                      throw (replyBody.error(`${apiErrorCode}_ERROR`, error.message));
                     //               }
                     //        })
                     // } else {
                     //        fs.appendFile(".allCountries.json", JSON.stringify(dataObj) + "]", error => {
                     //               if (error) {
                     //                      throw (replyBody.error(`${apiErrorCode}_ERROR`, error.message));
                     //               }
                     //        })
                     // }

                     // set data in database
                     await insertToDB(dataObj,ref, index + 1, apiErrorCode);

                     // console.log("\n");
                     // console.log(dataObj);
                     // console.log("\n");

                     // await Country.create(dataObj);
                     dataObj = {};
              });
              response = true
       } catch (error) {
              response = error.message;
       }
       return response;
};