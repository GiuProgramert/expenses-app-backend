const { Sequelize } = require('sequelize');
const { DB_DIALECT, DB_NAME, DB_USERNAME, DB_PASSWORD } = require('./getEnv');

// Option 1: Passing a connection URI
module.exports = new Sequelize(
    DB_NAME, 
    DB_USERNAME, 
    DB_PASSWORD, 
    { dialect: DB_DIALECT })