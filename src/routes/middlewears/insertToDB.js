// const ref = require("../../../config/ref.json");
const test = require("./test");

module.exports = async function (data,ref, index, apiErrorCode) {
       console.log("\n");
       console.log("****************************************")
       // console.log(data)
       const recursion = (data, ref , obj) => {
     
              console.log("data : ", data);
              console.log("\n");
              console.log("ref : ", ref);
              console.log("\n");
              console.log("\n");
              // console.log("obj : ", obj);
              // console.log("\n");
              for (let key in ref) {
                     if(ref[key].hasOwnProperty("key")){               
                                   console.log("key : ", key);
                                   console.log("ref[key] : ", ref[key]);
                                   console.log("data[key] : ", data[key]);
                                   console.log("_________________________________")
                            
                     }
                     if (ref[key].keyDefinition) {
                            if (Object.keys(ref[key]).length > 3) {    
                                   recursion(data[key], ref[key],obj);
                            }
                     } else{

                     }
              }
              // return obj
       }
       return recursion(data, ref,{});
}