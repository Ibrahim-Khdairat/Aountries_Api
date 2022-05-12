"use strict";
const { Country } = require("../../models/index");

module.exports = async function (data, keys) {
       let dataObj = {};
       let response;
       try {
              data.forEach(async (item, index) => {
                     for (let key in item) {
                            if (keys.includes(key)) {
                                   dataObj[key] = item[key].common;
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
}