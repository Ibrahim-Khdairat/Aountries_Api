const ref = require("../../../config/ref.json");
const DB = require("../../models/index");

module.exports = async function (data, ref, DB_TABLE, index) {

       const recursion = (data, ref, obj) => {
              console.log("\n");
              console.log("data : ", data);
              console.log("ref : ", ref);
              console.log("obj : ", obj);
              for (let key in data) {
                     console.log("_________________________")
                     console.log("key === ", key);
                     console.log("ref[key] === ", ref[key]);
                     console.log("data[key] === ", data[key]);
                     if (Object.keys(data[key]).length > 0) {
                            obj[ref.key.keyDefinition] = key;
                            console.log("obj[key] === ", obj);
                     }
              }
       }

       return recursion(data, ref, {});
}