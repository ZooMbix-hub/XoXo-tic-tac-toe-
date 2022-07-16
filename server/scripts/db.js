const { User, HistoryGames, UsersBlocked } = require('../models/models')

module.exports.getAllUsers = async function (users_online) {
    let usersDb;
    let usersBlockedDb;
    await User.findAll({ raw:true }).then(users => {
        usersDb = users.map((user) => {
            return { name: user.name, login: user.login, status: 3 }
        });
    }).catch(err => console.log(err));
    await UsersBlocked.findAll({ raw:true }).then(users => {
        usersBlockedDb = users;
    }).catch(err => console.log(err));
    const output = [...usersDb];
    users_online.forEach((s) => {
        const index = usersDb.findIndex((o) => o.login === s.login);
        output[index] = Object.assign({}, output[index], s);
    });
    const output2 = [...output];
    usersBlockedDb.forEach((s) => {
        const index = output.findIndex((o) => o.login === s.login);
        output2[index].status = 1;
    });
    return output2;
}

module.exports.getUpdateAllUsers = async function (users_online, usersBlocked) {
    let usersDb;
    await User.findAll({ raw:true }).then(users => {
        usersDb = users.map((user) => {
            return { name: user.name, login: user.login, status: 3 }
        });
    }).catch(err => console.log(err));
    const output = [...usersDb];
    users_online.forEach((s) => {
        const index = usersDb.findIndex((o) => o.login === s.login);
        output[index] = Object.assign({}, output[index], s);
    });
    const output2 = [...output];
    usersBlocked.forEach((s) => {
        const index = output.findIndex((o) => o.login === s.login);
        output2[index] = Object.assign({}, output2[index], s);
    });
    return output2;
}

module.exports.getUser = async function (login) {
    let portfolio_user;
    await User.findAll({
        where: {
          login: login
        }
    }).then(user => {
        portfolio_user = user[0].dataValues
    }).catch(err => console.log(err));
    return portfolio_user;
}

module.exports.addHistoryGame = async function (historyArr) {
    let nameFirst = historyArr[0].name;
    let roleFirst = historyArr[0].role;
    let winnerFirst = historyArr[0].winner;
    let nameSecond = historyArr[1].name;
    let roleSecond = historyArr[1].role;
    let dateGame = historyArr[3]
    let winnerSecond = historyArr[1].winner;
    let timeGame = historyArr[2];
    let createdAt, updatedAt;
    createdAt = updatedAt = new Date().toJSON();
    await HistoryGames.create({         
        nameFirst,
        roleFirst,
        winnerFirst,
        nameSecond,
        roleSecond,
        dateGame,
        winnerSecond,
        timeGame,
        createdAt,
        updatedAt 
    }).catch(err => console.log(err));
}