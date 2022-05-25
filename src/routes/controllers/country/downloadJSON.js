const express = require("express");
const router = express.Router();
const fs = require("fs");
const replyBody = require("../../common/replyBody");
const apiErrorCode = "DOWNLOAD_FILE";
const permission = require("../../middlewears/permission");
router.get("/", permission(), downloadJSON);

async function downloadJSON(req, res) {
       // let file = require("../../../../.allCountries.json")
       // file = JSON.stringify(file);
       var files = fs.createReadStream(".allCountries.json");
       res.writeHead(200, { 'Content-disposition': 'attachment; allCountries.json' });
       files.pipe(res)

//        fs.writeFile("test.txt",file , function (err) {
//               if (err) {
//                      console.log(err);
//               }
//        });
}

module.exports = router;