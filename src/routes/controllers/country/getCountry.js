"use strict";
/**
 * @api {post} /country/getCountry Get Country
 */
const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");
const verifyJWT = require("../../middlewears/verifyJWT");
const { Country } = require("../../../models/index");
const apiErrorCode = "GET_COUNTRY";

router.get("/",verifyJWT, getCountry);

async function getCountry(req, res) {
       await Country.findOne({
              where: req.body
              
       })
              .then(countries => {
                     if (countries !== null) {
                            res.status(200).json(replyBody.done({ data: countries }));
                     } else {
                            res.status(404).json(replyBody.error(`${apiErrorCode}_NOT_FOUND`, "No Countries Found"));
                     }
              })
              .catch(err => {
                     res.status(500).json(replyBody.error(`${apiErrorCode}_ERROR`, err.message));
              });
}

module.exports = router;