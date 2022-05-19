
const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");
const getAPIData = require("../../middlewears/getAPIData");
const setcountriesData = require("../../middlewears/setCountriesData");
const API = process.env.API;
// const { Country } = require("../../../models/index");
const DB_TABLES = require("../../../models/index");



router.get("/", getData);

async function getData(req, res) {
       let response =await DB_TABLES["NativeName"].findAll({
              where :{
                     countyrId: 2
              }
       });

       console.log("response: ", response);

       res.status(200).json(response);
}

module.exports = router;