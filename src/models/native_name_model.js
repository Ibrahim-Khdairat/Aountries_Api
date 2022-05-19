const NativeNameModel = (sequelize, DataTypes) => {
       const NativeName = sequelize.define("NativeName", {
              id: {
                     type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true
              },
              key: {
                     type: DataTypes.STRING,
              },
              common: {
                     type: DataTypes.STRING,
              },
              official: {
                     type: DataTypes.STRING,
              },
              nameId: {
                     type: DataTypes.INTEGER,
              },
              countyrId: {
                     type: DataTypes.INTEGER,
              },
       });
       return NativeName;
}

module.exports = NativeNameModel;