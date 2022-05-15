"use strict";

const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");
const verifyJWT = require("../../middlewears/verifyJWT");
const permission = require ("../../middlewears/permission");
const {Country} = require("../../../models/index");
const apiErrorCode = "GET_ALL_COUNTRIES";

router.get("/",verifyJWT, getAllCountries);

async function getAllCountries(req, res) {
       await Country.findAll()
       .then(countries => {
              if(countries.length > 0) {
                     res.status(200).json(replyBody.done({ data: countries }));
              } else {
                     res.status(404).json(replyBody.error(`${apiErrorCode}`, "No Countries Found"));
              }
       }) 
       .catch(err => {
              res.status(500).json(replyBody.error(`${apiErrorCode}_ERROR`, err.message));
       });
}

module.exports = router;