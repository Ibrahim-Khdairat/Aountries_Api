"use strict";
/**
 * @api {get} /country/getAllCountries Get All Countries
 * return all countries in the database otherwise return error message
 */
const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");
const DB = require("../../../models/index");
const apiErrorCode = "GET_ALL_COUNTRIES";
const ref = require("../../../../config/ref.json");

router.get("/", getAllCountries);

async function getAllCountries(req, res) {
       let query = {
              DB_TABLE: "Country",
              query: {},
       };
       let keys =[];
       for (let key in ref) {
              if(ref[key].keyDefinition ){
                     keys.push(key);
              }
       }
       for(let key in req.body){
              if(keys.includes(key)){
                     if(key === "name"){
                            query.DB_TABLE = "Name";
                            query.query["name"] = req.body[key];
                     }else if(key === "currency" || key === "language"){
                           return res.status(400).json(replyBody.error(`${apiErrorCode}`, "Please Enter a Valid Input For Search"));
                     } else{
                            query.DB_TABLE = "Country";
                            query.query[key] = req.body[key];
                     }
              }else {
                    return res.status(400).json(replyBody.error(`${apiErrorCode}`, "Please Enter a Valid Input"));
              }
       }

 
if(query.DB_TABLE === "Country"){
       await DB[query.DB_TABLE].findAll({
              where: query.query
       })
       .then(countries => {
              if(countries.length > 0) {
                     res.status(200).json(replyBody.done({ data: countries }));
              } else {
                     res.status(204).json(replyBody.error(`${apiErrorCode}`, "No Countries Found"));
              }
       }) 
       .catch(err => {
              res.status(500).json(replyBody.error(`${apiErrorCode}_ERROR`, "error in getting countries"));
       });
} else if(query.DB_TABLE === "Name"){
       await DB[query.DB_TABLE].findAll({
              where: query.query,
              include: [{
                     model: DB["Country"]
              }]
       })
       .then(countries => {
              console.log(countries);
              if(countries.length > 0) {
                     countries.filter(country => {
                            res.status(200).json(replyBody.done({ data: country.dataValues.Country.dataValues }));
                     })
              } else {
                     res.status(204).json(replyBody.error(`${apiErrorCode}`, "No Countries Found"));
              }
       }) 
       .catch(err => {
              res.status(500).json(replyBody.error(`${apiErrorCode}_ERROR`, "error in getting countries"));
       });
}
}

module.exports = router;