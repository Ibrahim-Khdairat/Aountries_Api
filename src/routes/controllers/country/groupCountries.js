"use strict";

const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");
const DB = require("../../../models/index");
const apiErrorCode = "GET_COUNTRY_CURRENCIES_BY_CCA2";

router.get("/", groupCountries);

async function groupCountries(req, res) {
       let query = {
              DB_TABLE:"",
              query:{},
       };
       let response =[];
       let keys =["region","language"];
       for (let key in req.body) {
              if(keys.includes(key) ){
                     if(key === "region"){
                            query.DB_TABLE = "Country";
                     } else if(key === "language"){
                            query.DB_TABLE = "Language";
                     }
                     query.query["languageKey"] = req.body[key];
              } else {
                     return res.status(400).json(replyBody.error(`${apiErrorCode}`, "Please Enter a Valid Input For Search"));
              }
       }

       if(query.DB_TABLE === "Country"){
       await DB[query.DB_TABLE].findAll({
              where: query.query
       })
              .then(countries => {
                     if (countries !== null) {
                            res.status(200).json(replyBody.done({ data: countries }));
                     } else {
                            res.status(204).json(replyBody.error(`${apiErrorCode}_NOT_FOUND`, "No Countries Found"));
                     }
              })
              .catch(err => {
                     res.status(500).json(replyBody.error(`${apiErrorCode}_ERROR`, "Cannot get countries"));
              });
       } else if(query.DB_TABLE === "Language"){
              await DB["CountryLanguage"].findAll({
                     where: query.query,
                     include: [{
                            model: DB["Country"]
                     }]
              })
                     .then(countries => {
                            if (countries !== null) {
                                   countries.filter(country => {
                                          response.push( country.dataValues.Country.dataValues);
                                   })
                                   res.status(200).json(replyBody.done({ data: response }));
                            } else {
                                   res.status(204).json(replyBody.error(`${apiErrorCode}_NOT_FOUND`, "No Languages Found"));
                            }
                     })
                     .catch(err => {
                            res.status(500).json(replyBody.error(`${apiErrorCode}_ERROR`, "Cannot get languages"));
                     });
       }
}

module.exports = router;