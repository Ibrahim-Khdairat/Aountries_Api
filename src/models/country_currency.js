const CountryCurrencyModel = (sequelize, DataTypes) => {
       const CountryCurrency = sequelize.define("CountryCurrency", {
              id: {
                     type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true
              },
              countryId: {
                     type: DataTypes.INTEGER,
              },
              currencyId: {
                     type: DataTypes.INTEGER,
              }
       });
       return CountryCurrency;
}
module.exports = CountryCurrencyModel;