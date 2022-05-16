
const CountryModel = (sequelize, DataTypes) => {
       const Country = sequelize.define("Country", {
              id: {
                     type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true
              },
              name: {
                     type: DataTypes.INTEGER,
                     ref:{
                            model: 'Name',
                            key: 'id'
                     }
              },
              cca2: {
                     type: DataTypes.STRING,
              },
              ccn3: {
                     type: DataTypes.INTEGER,
              },
              cca3: {
                     type: DataTypes.STRING,
              },
              region: {
                     type: DataTypes.STRING,
              },
              latlng: {
                     type: DataTypes.JSON,
              },
              currencies: {
                     type: DataTypes.INTEGER,
                     ref:{
                            model: 'Currency',
                            key: 'id'
                     }
              },
              languages : {
                     type: DataTypes.INTEGER,
                     ref:{
                            model: 'Language',
                            key: 'id'
                     }
              },
       });
       return Country;
}

module.exports = CountryModel;