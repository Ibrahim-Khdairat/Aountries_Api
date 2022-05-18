const NameModel = (sequelize, DataTypes) => {
              const Name = sequelize.define("Name", {
                     id: {
                            type: DataTypes.INTEGER,
                            primaryKey: true,
                            autoIncrement: true
                     },
                     common:{
                            type: DataTypes.STRING,
                     },
                     official: {
                            type: DataTypes.STRING,
                     },
                     nativeName: {
                            type: DataTypes.STRING,
                     },
                     countryId: {
                            type: DataTypes.INTEGER,
                     },
              });
              return Name;
}
module.exports = NameModel;