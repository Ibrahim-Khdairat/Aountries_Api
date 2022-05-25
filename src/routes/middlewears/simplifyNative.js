
const DB = require("../../models/index");

module.exports = async function (data, ref , countryId){
       const recursion = async (data, ref, obj) => {
              for (let key in data) {
                     if(typeof data[key] === 'object'){

                            obj["nativeKey"] = key;
                            obj["isNative"] = true;
                            obj["countryId"] = countryId;
                            await recursion(data[key], ref, obj);
                     } else{
                            obj["type"] = key;
                            obj["name"] = data[key];

                     }
                     await DB[ref.DB_TABLE].create(obj);
              }
       }
       await recursion(data, ref, {});
}