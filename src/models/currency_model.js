const CurrencyMolel = (sequelize , DataTypes)=>{
       const Currency = sequelize.define("Currency", {
              id: {
                     type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true
              },
              symbol: {
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
       return Currency;
}

module.exports = CurrencyMolel;