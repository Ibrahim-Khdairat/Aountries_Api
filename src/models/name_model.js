const NameModel = (sequelize, DataTypes) => {
              const Name = sequelize.define("Name", {
                     type:{
                            type: DataTypes.STRING,
                     },
                     name:{
                            type: DataTypes.STRING,
                     },
                     isNative:{
                            type: DataTypes.BOOLEAN,
                     },
                     nativeKey:{
                            type: DataTypes.STRING,
                     },
                     countryId: {
                            type: DataTypes.INTEGER,
                     },
              });
              return Name;
}
module.exports = NameModel;