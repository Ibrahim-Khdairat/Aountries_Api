const replyBody = require('../common/replyBody')
module.exports = () => {

    return (req, res, next) => {
       //  if (req.user.capabilities.indexOf(capability) > -1) {
       //      res.status(200).json(replyBody.success("Permission_Granted", "Permission Granted"));
       //  }
       //  else {
       //      res.status(401).json(replyBody.error("Permission_Denied", "Forbidden"));
       //  }
        if (req.user.roleId == "admin") {
            next();
        } else {
            res.status(401).json(replyBody.error("Permission_Denied", `Forbidden`));
        }
    };
}