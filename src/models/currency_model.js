const CurrencyMolel = (sequelize , DataTypes)=>{
       const Currency = sequelize.define("Currency", {
              id: {
                     type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true
              },
              key: {
                     type: DataTypes.STRING,
              },
              name: {
                     type: DataTypes.STRING,
              },
              symbol: {
                     type: DataTypes.STRING,
              }
       });
       return Currency;
}

module.exports = CurrencyMolel;