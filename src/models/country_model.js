
const CountryModel = (sequelize, DataTypes) => {
       const Country = sequelize.define("Country", {
              id: {
                     type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true
              },
              cca2: {
                     type: DataTypes.STRING,
              },
              ccn3: {
                     type: DataTypes.STRING,
              },
              cca3: {
                     type: DataTypes.STRING,
              },
              region: {
                     type: DataTypes.STRING,
              },
              latlng: {
                     type: DataTypes.ARRAY(DataTypes.FLOAT),
              },

       });
       return Country;
}

module.exports = CountryModel;