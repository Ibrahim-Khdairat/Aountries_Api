
'use strict';

const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Users} = require("../../../models/index");
const apiErrorCode = "USER_LOGIN";



router.post("/", login);

async function login(req, res, next) {
       try {
              let users = await Users.findOne({
                     where: {
                            userName: req.body.userName
                     }
              });
              if (users == null) {
                     res.status(401).json(replyBody.error(`${apiErrorCode}_USER_NOT_FOUND`, "User_Not_Found"));
              } else {
                     let userData = users.dataValues;
                     const match = await bcrypt.compare(req.body.password, userData.password);
                     if (match) {
                            const token = jwt.sign(
                                   {
                                          id: userData.id,
                                          capabilities: userData.capabilities,
                                          roleId : userData.roleId
                                   },
                                   process.env.JWT_SECRET || "MYSUPERSECRET",
                            );
                            res.status(200).json(replyBody.done({data : token}));
                     } else {
                            res.status(401).json(replyBody.error(`${apiErrorCode}_INVALID_PASSWORD`, "Invalid Password"));
                     }
              }
       } catch (e) {
              res.status(401).json(replyBody.error(`${apiErrorCode}_ERROR`, `${e.message}`));
              // next(e.message);
       }
}


module.exports = router;