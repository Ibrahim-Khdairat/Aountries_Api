const NameModel = (sequelize, DataTypes) => {
              const Name = sequelize.define("Name", {
                     id: {
                            type: DataTypes.INTEGER,
                            primaryKey: true,
                            autoIncrement: true
                     },
                     keyDefinition:{
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
              return Name;
}