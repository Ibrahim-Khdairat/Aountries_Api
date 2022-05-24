

const LanguageModel = (sequelize, DataTypes) => {
       const Language = sequelize.define("Language", {
              key: {
                     type: DataTypes.STRING,
                     primaryKey: true,
                     unique: true
              },
              name: {
                     type: DataTypes.STRING,
              }
        
       });
       return Language;
}

module.exports = LanguageModel;