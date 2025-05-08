const { Sequelize } = require('sequelize');
const config = require('./config.json'); // Adjust the path as necessary
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development'; // Default to development
const dbConfig = config[environment];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

module.exports = sequelize;