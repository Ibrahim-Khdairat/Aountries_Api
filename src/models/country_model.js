
const CountryModel = (sequelize, DataTypes) => {
       const Country = sequelize.define("Country", {
              id: {
                     type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true
              },
              name: {
                     type: DataTypes.STRING,
                     allowNull: false,
                     unique: true
              },
       });
       return Country;
}

module.exports = CountryModel;