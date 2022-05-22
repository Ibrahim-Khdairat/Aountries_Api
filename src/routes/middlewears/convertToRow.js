const ref = require("../../../config/ref.json");
const DB = require("../../models/index");

module.exports = async function (data, ref, obj, index) {
    console.log("**************************************")
    console.log("data: ", data);
    console.log("ref: ", ref);
    console.log('\n')
    // for (let i in data) {
    //     recursion(i, data, ref, {}, index);
    // }
    recursion(data, ref, {}, index);
}

const recursion = async (data, ref, obj, index) => {
    // obj[ref.key.keyDefinition] = key
    
    console.log("data: ", data[key]);
    console.log("ref: ", ref);
    console.log("obj: ", obj);
    for (let key in data) {
        if (typeof data[key] === 'object') {
            obj[ref.key.keyDefinition] = key;
            recursion(data[key], ref, obj, index);
        } else{
            
        }
    }

    obj.countryID = index;
    // await DB[ref.DB_TABLE].create(obj);
    return obj;
}
