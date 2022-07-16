/* Подключение к бд */

const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    process.env.DB_NAME, // название бд
    process.env.DB_USER, // пользователь
    process.env.DB_PASSWORD, // пароль бд
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
);