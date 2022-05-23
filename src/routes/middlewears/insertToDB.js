// const ref = require("../../../config/ref.json");
const convertToRow =require("./convertToRow");
const DB_TABLES = require("../../models/index")

module.exports = async function (data, ref, index, apiErrorCode) {
    const recursion = async (data, ref, obj) => {
        for (let key in ref) {
            if (ref[key].keyDefinition) {
                if (Object.keys(ref[key]).length > 2) {
                    if (ref[key].key === undefined) {
                        recursion(data[key], ref[key], obj);
                    } else {
                            convertToRow(data[key], ref[key], obj , index);
                    }
                }
            }
        }
    }
    return recursion(data, ref, {});
}