const { Sequelize } = require('sequelize');
const dotenv        = require('dotenv');

dotenv.config();
const { DB_DIALECT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

// Option 1: Passing a connection URI
module.exports = new Sequelize(
    DB_NAME, 
    DB_USERNAME, 
    DB_PASSWORD, 
    { dialect: DB_DIALECT })