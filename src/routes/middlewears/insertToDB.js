// const ref = require("../../../config/ref.json");
const convertToRow = require("./convertToRow");
const DB_TABLES = require("../../models/index")

module.exports = async function (data, ref,arrayObj, apiErrorCode) {
    let dataObj = {};
    let obj = {};
    for (let key in ref) {
        if (ref[key].keyDefinition) {
            if (Object.keys(ref[key]).length < 2) {
                dataObj[key] = data[key]
            } else {
                obj[key] = data[key];
            }
        }
    }
  let response =  await DB_TABLES[ref.DB_TABLE].create(dataObj);
    obj.countryId = response.dataValues.id;
   arrayObj =  await convertToRow(obj, ref, arrayObj,apiErrorCode);
    return arrayObj;
}








// if (ref[key].keyDefinition) {
//     if (Object.keys(ref[key]).length > 2) {
//         if (ref[key].key === undefined) {
//             recursion(data[key], ref[key], obj);
//         } else {
//                 convertToRow(data[key], ref[key], obj , index);
//         }
//     }
// }