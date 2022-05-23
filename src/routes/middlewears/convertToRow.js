/**
 * @param {object} data - country object to be converted to row
 * @param {object} ref - reference object
 * @param {object} obj - object to store the date after inersertion to database
 * @param {number} index - index of the country
 * @returns {object} - the recored that stored in database
 */



const ref = require("../../../config/ref.json");
const DB = require("../../models/index");

module.exports = async function (data, ref, obj, index) {
    console.log("**********************************************************************************************************************")
    console.log("data : ", data);
    console.log("ref : ", ref);
    console.log('\n')
    console.log("\n")

    recursion(data, ref, {}, index);
}

const recursion = async (data, ref, obj, index) => {
    console.log("_____________ Entre a recursion _____________")
    console.log("data : ", data);
    console.log("obj : ", obj);
    console.log("\n")

    for (let key in data) {
        console.log("key: ", key);
        console.log("data[key]: ", data[key]);
        if (typeof data[key] === 'object') {
            console.log("<<< OBJECT >>>");
            console.log("\n")
            obj[ref.key.keyDefinition] = key;
            recursion(data[key], ref, obj, index);
        } else {
            console.log("<<< STRING >>>");
            console.log("\n")
            obj[key] = data[key];
        }
    }
    obj.countryID = index;
    console.log("obj after: ", obj);
    // await DB[ref.DB_TABLE].create(obj);
   
    // return obj;
}
