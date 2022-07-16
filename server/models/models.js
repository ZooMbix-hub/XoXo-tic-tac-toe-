/* таблицы бд */

const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    age: { type: DataTypes.DATEONLY },
    gender: { type: DataTypes.STRING },
    countGames: { type: DataTypes.INTEGER, defaultValue: 0 },
    countGamesWin: { type: DataTypes.INTEGER, defaultValue: 0 },
    countGamesLos: { type: DataTypes.INTEGER, defaultValue: 0 },
    login: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    createdAt: { type: DataTypes.DATEONLY },
    updatedAt: { type: DataTypes.DATEONLY }
},
{
    timestamps: false,
});

const HistoryGames = sequelize.define('historyGames', { 
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameFirst: { type: DataTypes.STRING },
    roleFirst: {type: DataTypes.STRING },
    winnerFirst: { type: DataTypes.BOOLEAN },
    nameSecond: { type: DataTypes.STRING },
    roleSecond: {type: DataTypes.STRING },
    winnerSecond: { type: DataTypes.BOOLEAN },
    dateGame: { type: DataTypes.DATEONLY },
    timeGame: { type: DataTypes.TIME }
});

const UsersBlocked = sequelize.define('usersBlocked', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    login: { type: DataTypes.STRING, unique: true },
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

module.exports = {
    User,
    HistoryGames,
    UsersBlocked
};