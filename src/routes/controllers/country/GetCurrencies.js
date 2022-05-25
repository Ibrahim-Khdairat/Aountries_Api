"use strict";

const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");
const DB = require("../../../models/index");
const apiErrorCode = "GET_COUNTRY_CURRENCIES_BY_CCA2";

router.get("/", getCurrencies);

async function getCurrencies(req, res) {
    let response = [];
    let query = {},
        keys = ["cca2"];
    for (let key in req.body) {
        if (keys.includes(key)) {
            query[key] = req.body[key];
        } else {
            return res.status(400).json(replyBody.error(`${apiErrorCode}`, "Please Enter a Valid Input For Search"));
        }
    }


    await DB["Country"].findOne({
        where: query,

    })
        .then(async countries => {
            if (countries !== null) {
                await DB["CountryCurrency"].findAll({
                    where: {
                        countryId: countries.id
                    },
                    include: [{
                        model: DB["Currency"]
                    }]
                })
                    .then(currencies => {
                        if (currencies !== null) {
                            currencies.filter(currency => {
                                response.push(
                                    {
                                        [currency.dataValues.Currency.dataValues.key]: {
                                            name: currency.dataValues.Currency.dataValues.name,
                                            symbol: currency.dataValues.Currency.dataValues.symbol,
                                        }
                                    }
                                );
                            })
                            res.status(200).json(replyBody.done({ data: response }));
                        } else {
                            res.status(204).json(replyBody.error(`${apiErrorCode}_NOT_FOUND`, "No Currencies Found"));
                        }
                    })
                    .catch(err => {
                        res.status(500).json(replyBody.error(`${apiErrorCode}_ERROR`, "Cannot get currencies"));
                    });

            } else {
                res.status(204).json(replyBody.error(`${apiErrorCode}_NOT_FOUND`, "No Countries Found"));
            }
        })
        .catch(err => {
            res.status(500).json(replyBody.error(`${apiErrorCode}_ERROR`, 'Cannot get currencies'));
        });
}

module.exports = router;