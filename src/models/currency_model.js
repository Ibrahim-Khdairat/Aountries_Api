const CurrencyMolel = (sequelize , DataTypes)=>{
       const Currency = sequelize.define("Currency", {
              key: {
                     type: DataTypes.STRING,
                     primaryKey: true,
                     unique: true
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