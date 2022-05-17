"use strict";

const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");
const verifyJWT = require("../../middlewears/verifyJWT");
const { Country } = require("../../../models/index");
const ref = require("../../../../config/ref");
const apiErrorCode = "GET_COUNTRY_CURRENCIES_BY_CCA2";

router.get("/", groupCountries);

async function groupCountries(req, res) {
       await Country.findAll({
              where: req.body,
       })
              .then(countries => {
                     if (countries !== null) {
                            res.status(200).json(replyBody.done({ data: countries }));
                     } else {
                            res.status(204).json(replyBody.error(`${apiErrorCode}_NOT_FOUND`, "No Countries Found"));
                     }
              })
              .catch(err => {
                     res.status(500).json(replyBody.error(`${apiErrorCode}_ERROR`, err.message));
              });
}

module.exports = router;