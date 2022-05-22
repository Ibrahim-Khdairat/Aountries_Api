

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
              },
              countryID: {
                     type: DataTypes.INTEGER,
              },
       });
       return Language;
}

module.exports = LanguageModel;