'use strict';

/**
 * 
 */
const base64 = require('base-64');
const {Users} = require('../../models/index');
const replyBody = require('../common/replyBody');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        next('Invalid login');
    }
    // basic ajkldsfhlkdsjfds
    const encodedCredintials = req.headers.authorization.split(' ').pop();
    //email:password
    const [email, password] = base64.decode(encodedCredintials).split(':');
   
    
    Users.authenticateBasic(email, password)
        .then((user) => {
         
            req.user = user;
            if(user === "Invalid User"){
                res.status(401).json(replyBody.error("Invalid_User", "Invalid UserName or Password"));
            }
            next();
        })
        .catch((err) => next(err.message));
}