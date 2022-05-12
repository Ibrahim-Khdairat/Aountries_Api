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

const Country = CountryModel(sequelize, DataTypes);

module.exports = {
       db: sequelize,
       Country: Country,
};