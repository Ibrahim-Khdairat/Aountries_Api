
/**
 * check if the user have the permission to access the route
 * @retrun continoue to next middleware if the user has the capability otherwise throw error
 */


const replyBody = require('../common/replyBody')
module.exports = () => {

       return (req, res, next) => {
              if (req.headers.x_admin == 1) {
                     next();
              } else {
                     res.status(401).json(replyBody.error("Permission_Denied", `Forbidden`));
              }
              //  if (req.user.capabilities.indexOf(capability) > -1) {
              //      res.status(200).json(replyBody.success("Permission_Granted", "Permission Granted"));
              //  }
              //  else {
              //      res.status(401).json(replyBody.error("Permission_Denied", "Forbidden"));
              //  }

              //  if (req.user.roleId == "admin") {
              //      next();
              //  } else {
              //      res.status(401).json(replyBody.error("Permission_Denied", `Forbidden`));
              //  }
       };
}