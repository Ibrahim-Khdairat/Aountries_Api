'use strict';
const replyBody = require('../routes/common/replyBody');

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const SQL_DATABASE_URL = process.env.SQL_DATABASE_URL;

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
const NameModel = require("./name_model");
const CountryCurrencyModel = require("./country_currency");
const CountryLanguageModel = require("./country_language");
const NativeNameModel = require("./native_name_model");

const Country = CountryModel(sequelize, DataTypes);
const Users = UsersModel(sequelize, DataTypes);
const Language = LanguageModel(sequelize, DataTypes);
const Currency = CurrencyModel(sequelize, DataTypes);
const Name = NameModel(sequelize, DataTypes);
const CountryCurrency = CountryCurrencyModel(sequelize, DataTypes);
const CountryLanguage = CountryLanguageModel(sequelize, DataTypes);
const NativeName = NativeNameModel(sequelize, DataTypes);


//  Countrt To Name Relation
Country.hasOne(Name, {sourceKey:'id', foreignKey: 'countryId' });
Name.belongsTo(Country, { foreignKey: 'countryId', targetKey : 'id' });

// Name To Native Name Relation
Name.hasMany(NativeName, {sourceKey:'id', foreignKey: 'nameId' });
NativeName.belongsTo(Name, { foreignKey: 'nameId', targetKey : 'id' });

//  Country To Currency Relation
Country.hasMany(CountryCurrency, {sourceKey:'id', foreignKey: 'countryId' });
CountryCurrency.belongsTo(Country, { foreignKey: 'countryId', targetKey : 'id' });

Currency.hasMany(CountryCurrency, {sourceKey:'id', foreignKey: 'currencyId' });
CountryCurrency.belongsTo(Currency, { foreignKey: 'currencyId', targetKey : 'id' });

// Country To Language Relation
Country.hasMany(CountryLanguage, {sourceKey:'id', foreignKey: 'countryId' });
CountryLanguage.belongsTo(Country, { foreignKey: 'countryId', targetKey : 'id' });

Language.hasMany(CountryLanguage, {sourceKey:'id', foreignKey: 'languageId' });
CountryLanguage.belongsTo(Language, { foreignKey: 'languageId', targetKey : 'id' });



module.exports = {
       db: sequelize,
       "Country": Country,
       "Users": Users,
       "Language": Language,
       "Currency": Currency,
       "Name": Name,
       "CountryCurrency": CountryCurrency,
       "CountryLanguage": CountryLanguage,
       "NativeName": NativeName,

};