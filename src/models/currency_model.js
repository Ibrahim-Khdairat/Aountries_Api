const CurrencyMolel = (sequelize , DataTypes)=>{
       const Currency = sequelize.define("Currency", {
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
              symbol: {
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
       return Currency;
}

module.exports = CurrencyMolel;