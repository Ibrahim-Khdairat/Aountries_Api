const CountryCurrencyModel = (sequelize, DataTypes) => {
       const CountryCurrency = sequelize.define("CountryCurrency", {
              countryId: {
                     type: DataTypes.INTEGER,
              },
              currencyKey: {
                     type: DataTypes.STRING,
              }
       });
       return CountryCurrency;
}
module.exports = CountryCurrencyModel;