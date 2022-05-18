

const LanguageModel = (sequelize, DataTypes) => {
       const Language = sequelize.define("Language", {
              id: {
                     type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true
              },
              key: {
                     type: DataTypes.STRING,
              },
              name: {
                     type: DataTypes.STRING,
              }
       });
       return Language;
}

module.exports = LanguageModel;