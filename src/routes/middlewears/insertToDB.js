// const ref = require("../../../config/ref.json");
const test = require("./test");
const DB_TABLES = require("../../models/index")

module.exports = async function (data, ref, index, apiErrorCode) {
       // console.log("\n");
       console.log("**************************************************************************************")
       // console.log("data: ", data);
       // console.log('\n');
       // console.log("ref: ", ref);
       // console.log('\n');
       // console.log('\n');
       const recursion = async (data, ref, obj) => {
              // console.log("________Entry of recursion________");
              // console.log("data: ", data);
              // console.log("ref: ", ref);
              // console.log("obj: ", obj);
              // console.log('\n');
              // console.log('\n');
              for (let key in ref) {
                     if (ref[key].keyDefinition) {
                            if (Object.keys(ref[key]).length > 2) {
                                   if (ref[key].key === undefined) {
                                          // console.log("---- without key ----");
                                          // console.log("key: ", key);
                                          // console.log("ref[key]: ", ref[key]);
                                          // console.log("data[key]: ", data[key]);
                                          // console.log('\n');
                                          recursion(data[key], ref[key], obj);
                                   } else {
                                          // console.log("---- with key ----");
                                          // console.log("key: ", key);
                                          // console.log("ref[key]: ", ref[key]);
                                          // console.log("data[key]: ", data[key]);
                                          // console.log('\n');
                                          console.log("ref[key].DB_TABLE: ", ref[key].DB_TABLE);
                                          const recursion_2 = async (data2, ref2, obj2) => {
                                                 console.log(index , "________Entry of recursion_2________");
                                                 console.log("data2: ", data2);
                                                 console.log("ref2: ", ref2);
                                                 console.log("obj2: ", obj2);
                                                 console.log('\n');
                                                 for (let i in data2) {
                                                    
                                                     
                                                    
                                                        if (typeof data2[i] === "object") {
                                                               console.log("data2[i] is object >>>>>>>>>>>");
                                                               obj2[ref2.key.keyDefinition] = i;
                                                               console.log("i: ", i);
                                                               console.log("data2[i]: ", data2[i]);
                                                               console.log("obj2: ", obj2);
                                                               console.log('\n');
                                                               recursion(data2[i], ref2.key, obj2);
                                                        } else {
                                                               console.log("data2[i] is not object >>>>>>>>>>>");
                                                               obj2[ref2.key.keyDefinition] = i;
                                                               console.log("i: ", i);
                                                               console.log("data2[i]: ", data2[i]);
                                                               console.log('\n');
                                                               obj2[i] = data2[i];
                                                               console.log("obj2: ", obj2);
                                                        }
                                                 }

                                                 return obj2;
                                          }
                                           obj = await recursion_2(data[key], ref[key], obj);
                                           console.log("obj: ", obj);
                                          await DB_TABLES[ref[key].DB_TABLE].create(obj);

                                          // for (let i in data[key]) {

                                          //        obj[ref[key].key.keyDefinition] =i;

                                          //        // console.log("obj to DB: ", obj);
                                          //        if(typeof data[key][i] === "object"){
                                          //               // recursion(data[key][i], ref[key].key, obj);

                                          //        }
                                          //        if(ref[key].DB_TABLE === "NativeName"){
                                          //        obj.countyrId = index;
                                          //        await DB_TABLES[ref[key].DB_TABLE].create(obj);
                                          //        }
                                          // }

                                   }
                            }
                     }
              }
       }
       return recursion(data, ref, {});
}