const  CountryLanguageModel  = (sequelize , DataTypes)=>{
              const CountryLanguage = sequelize.define("CountryLanguage", {
                     id: {
                            type: DataTypes.INTEGER,
                            primaryKey: true,
                            autoIncrement: true
                     },
                     countryId: {
                            type: DataTypes.INTEGER,
                     },
                     languageId: {
                            type: DataTypes.INTEGER,
                     }
              });
              return CountryLanguage;
}
module.exports = CountryLanguageModel;