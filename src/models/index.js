'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const SQL_DATABASE_URL = process.env.SQL_DATABASE_URL || "postgres://spddfzot:Jun2hHAiNfrJJ1KrkJWyGbBsjX6UBSGn@lallah.db.elephantsql.com/spddfzot";
const sequelize = new Sequelize(SQL_DATABASE_URL, {
       dialect: 'postgres',
       logging: false,
       define: {
              timestamps: false,
              freezeTableName: true,
       },
});

const CountryModel = require("./country_model");
const UsersModel = require("./user_model");
const LanguageModel = require("./language_model");
const CurrencyModel = require("./currency_model");

const Country = CountryModel(sequelize, DataTypes);
const Users = UsersModel(sequelize, DataTypes);
const Language = LanguageModel(sequelize, DataTypes);
const Currency = CurrencyModel(sequelize, DataTypes);

Country.hasMany(Language, {sourceKey:'id', foreignKey: 'countryId' });
Language.belongsTo(Country, { foreignKey: 'countryId', targetKey : 'id' });

Country.hasMany(Currency, {sourceKey:'id', foreignKey: 'countryId' });
Currency.belongsTo(Country, { foreignKey: 'countryId', targetKey : 'id' });



module.exports = {
       db: sequelize,
       Country: Country,
       Users: Users,
};