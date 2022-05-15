'use strict';


/**
 * verify the token and return the user if it exists
 * @param {*} token
 * @returns appedned user object to req.body if true otherwise retrun error message
 */
const { Users } = require('../../models/index');
const replyBody = require('../common/replyBody');

module.exports = async (req, res, next) => {
    let token;
    if (req.body.roleId == "admin") {
        const requiredUserData = {
            userName: req.body.userName,
            password: req.body.password,
            roleId: req.body.roleId,
            gender: req.body.gender,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
     }

         // check the inputs
         const usernameRegex = /^[0-9a-zA-Z_.-]+$/;
         if (!usernameRegex.test(requiredUserData.userName)) {
                return res.status(403).json(replyBody.error("Registration_BadData", "user name must not contain spaces"))
         }
         if (requiredUserData.password.length < 3) {
                return res.status(403).json(replyBody.error("Registration_BadData", "password must be at least 3 characters long"))
         }

        let checkUser = await Users.findOne({
            where: {
                roleId: req.body.roleId
            }
        });

        if (checkUser===null) {
          const record = await Users.create(
                req.body
            );
            res.status(201).json(record);
        } else {
            return res.status(400).json(replyBody.error("Registration_UserExists", "Admin Already Exists"))
        }
    } else {
        if (!req.headers.authorization) {
            return res.status(401).json(replyBody.error("User_Authorization_Error", "Authorization Header Missing"));
        } else {
              // let token = req.headers["access-token"];
            token = req.headers.authorization.split(' ').pop();
            try {
                let validUser = await Users.authenticateToken(token);
                req.user = validUser;
                req.token = validUser.token;
                req.user = validUser
                next()
            }
            catch (e) {
                return res.status(401).json(replyBody.error("User_Authorization_Error", "Un_Authorized User"));
            }
        }
    }
}