

const LanguageModel = (sequelize, DataTypes) => {
       const Language = sequelize.define("Language", {
              id: {
                     type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true
              },
              keyDefinition: {
                     type: DataTypes.STRING,
              },
              name: {
                     type: DataTypes.STRING,
              },
              countryId: {
                     type: DataTypes.INTEGER,
                     references: {
                            model: 'Country',
                            key: 'id'
                     }
              },
       });
       return Language;
}

module.exports = LanguageModel;