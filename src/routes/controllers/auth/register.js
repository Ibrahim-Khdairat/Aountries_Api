"use strict";

/**
 * @api {post} /auth/register Register
 * @apiName Register
 * @apiGroup Auth
 * @apiDescription Register a new user
 * @apiParam {String} userName User name
 * @apiParam {String} password Password
 * @apiParam {String} roleId Role Id
 * @apiParam {String} email Email
 * @apiSuccess {String} data User created successfully
 * @apiError {String} error Error
 */
const express = require("express");
const router = express.Router();
const replyBody = require("../../common/replyBody");
const verifyJWT = require("../../middlewears/verifyJWT");
const permission = require ("../../middlewears/permission");
const {Users} = require("../../../models/index");
const apiErrorCode = "USER_REGISTER";

router.post("/", verifyJWT, permission(), register);

async function register(req, res, next) {
       const requiredUserData = {
              userName: req.body.userName,
              password: req.body.password,
              roleId: req.body.roleId,
              email: req.body.email,
       }

       try {
              // check the inputs
              const usernameRegex = /^[0-9a-zA-Z_.-]+$/;
              if (!usernameRegex.test(requiredUserData.userName)) {
                     return res.status(403).json(replyBody.error(`${apiErrorCode}_BadData`, "user name must not contain spaces"))
              }
              if (requiredUserData.password.length < 3) {
                     return res.status(403).json(replyBody.error(`${apiErrorCode}_BadData`, "password must be at least 3 characters long"))
              }
              if(["superAdmin","admin","user"].indexOf(requiredUserData.roleId) === -1) {
                     return res.status(403).json(replyBody.error(`${apiErrorCode}_BadData`, "roleId must be either superAdmin or admin or user"))
              }

              
              let checkUser = await Users.findOne({
                     where: {
                            userName: req.body.userName
                     }
              });

              if (checkUser == null) {
                     const record = await Users.create(
                            req.body
                     );
                     res.status(201).json(replyBody.done({ data: "User_Created_Successfully" }));
              } else {
                     res.status(400).json(replyBody.error(`${apiErrorCode}_UserExists`, "User Already Exists"));
              }
       } catch (e) {
              res.status(400).json(replyBody.error(`${apiErrorCode}_Error`, `${e.message}`));
       }
}

module.exports = router;