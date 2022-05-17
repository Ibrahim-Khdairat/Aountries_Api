const ref = require("../../../config/ref.json");
const test = require("./test");

module.exports = async function (data, index, apiErrorCode) {
       const recursion = (data, ref) => {
              for (let key in ref) {
                     if (ref[key].keyDefinition) {
                            if (Object.keys(ref[key]).length > 3) {
                                   recursion(data[key], ref[key]);
                            } 
                     }
              }
              return true
       }
       return recursion(data, ref);
}