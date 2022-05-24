const  CountryLanguageModel  = (sequelize , DataTypes)=>{
              const CountryLanguage = sequelize.define("CountryLanguage", {
                     countryId: {
                            type: DataTypes.INTEGER,
                     },
                     languageKey: {
                            type: DataTypes.STRING,
                     }
              });
              return CountryLanguage;
}
module.exports = CountryLanguageModel;