/**
 * @param {object} data - country object to be converted to row
 * @param {object} ref - reference object
 * @param {object} obj - object to store the date after inersertion to database
 * @param {number} index - index of the country
 * @returns {object} - the recored that stored in database
 */

const DB = require("../../models/index");
const simplifyNative = require("./simplifyNative");
module.exports = async function (data, ref, arrayObj, apiErrorCode) {
    for (let key in data) {
        if (ref[key]) {
            if (ref[key].isLookup) {
                arrayObj = convertLookupToRow(data[key], ref[key], arrayObj, data.countryId, apiErrorCode);
            } else {
                convertNameToRow(data[key], ref[key], data.countryId);
            }
        }
    }
    return arrayObj;
}


const convertNameToRow = async (data, ref, countryId) => {
    
    let dataObj = {};
    for (let key in data) {
        if (ref[key].keyDefinition === "nativeName") {
            simplifyNative(data[key], ref[key], countryId);
        } else {
            await DB[ref.DB_TABLE].create({
                countryId: countryId,
                type: ref[key].keyDefinition,
                name: data[key],
                isNative: false,
            })
        }
    }
}


const convertLookupToRow = async (data, ref, arrayObj, countryId) => {
    if (ref.keyDefinition === "languages") {
        for (let key in data) {
            let obj = {
                key: key,
                name: data[key],
            }
            let response = false;
            arrayObj.languages.forEach(element => {
                if (element.key === obj.key) {
                    response = true;
                    return;
                }
            });
            if (response) {
                await DB["CountryLanguage"].create({
                    countryId: countryId,
                    languageKey: obj.key,
                });
            } else {
                arrayObj.languages.push(obj);
                await DB[ref.DB_TABLE].create(obj);
                await DB["CountryLanguage"].create({
                    countryId: countryId,
                    languageKey: obj.key,
                });
            }
        }
    } else {
        arrayObj = await convertCurrencyToRow(data, ref, await arrayObj, countryId);
    }
    return arrayObj;
}

const convertCurrencyToRow = async (data, ref, arrayObj, countryId) => {
    for (let key in data) {
        let obj = {
            key : key,
            name : data[key].name,
            symbol : data[key].symbol,
        }
        let response = false;
        arrayObj.currencies.forEach(element => {
            if (element.key === obj.key) {
                response = true;
                return;
            }
        });
        if (response) {
             await DB["CountryCurrency"].create({
                    countryId: countryId,
                    currencyKey: obj.key,
                });
        } else {
            arrayObj.currencies.push(obj);
            await DB[ref.DB_TABLE].create(obj);
            await DB["CountryCurrency"].create({
                countryId: countryId,
                currencyKey: obj.key,
            });
        }
    }
    return arrayObj;
}
