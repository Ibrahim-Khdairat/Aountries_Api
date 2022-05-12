"use strict";
const axios = require("axios");

module.exports = async function (API) {
    let dataResponse =  await axios.get(API)
        .then(function (response) {
                return response.data;
        })
              .catch(function (error) {
                     console.log(error);
              });
       return dataResponse;
}