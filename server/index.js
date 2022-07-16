require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors'); 
const router = require('./routes/index');
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware');
const { User, HistoryGames, UsersBlocked } = require('./models/models')

async function getAllUsers (users_online) {
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

async function getUpdateAllUsers (users_online, usersBlocked) {
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

async function getUser (login) {
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

async function addHistoryGame (historyArr) {
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function calculateWinners(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (squares[a] !== null && squares[b] !== null && squares[c] !== null) {
        if (squares[a].role && squares[a].role === squares[b].role && squares[a].role === squares[c].role) {
          return [squares[a], [a, b, c]];
        }
      }
    }
    return null;
}

function isEmptyObj(object) {
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
}

const PORT = process.env.PORT || 4000;
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
});

let users = [];
let usersOnline = [];
let usersBlocked = [];
let rooms = [];

io.on("connection", (socket) => {
    users.push(socket.id);

    socket.on('setUsersOnline', async (data) => {
        usersOnline.push({
            socketId: socket.id,
            login: data,
            status: 0
        })

        const newUsersOnline = await getAllUsers(usersOnline)

        socket.broadcast.emit("updateUsersOnline", newUsersOnline);
        console.log('------авторизован поль вх------')
        console.log(usersOnline)

        socket.emit('getUsersOnline', newUsersOnline)
    })

    socket.on('getUsersOnline', async () => {
        const newUsersOnline = await getAllUsers(usersOnline)

        socket.emit('getUsersOnline', newUsersOnline)
    })

    socket.on('disconUsersOnline', async () => {
        usersOnline = usersOnline.filter((user) => user.socketId !== socket.id)
        
        const newUsersOnline = await getAllUsers(usersOnline)

        socket.broadcast.emit("updateUsersOnline", newUsersOnline);
    })

    socket.broadcast.emit("updateUsers", users);

    socket.on("disconnecting", () => {
        var myArr = Array.from(socket.rooms); 
        io.to(myArr[1]).emit("disconnect_room");
    });

    socket.on("disconnect", async () => {
        console.log(`User ${socket.id} disconnected.`);
        users = users.filter((user) => user !== socket.id);

        usersOnline = usersOnline.filter((user) => user.socketId !== socket.id)
        const newUsersOnline = await getAllUsers(usersOnline)

        console.log('------авторизован поль вых------')
        console.log(usersOnline);

        socket.broadcast.emit("updateUsersOnline", newUsersOnline);

        socket.disconnect();  
    });

    socket.emit("getAllUsers", users);

    socket.on("invitePlayer_server", async (userReq, userRes, userLogin) => {
        let portfolio_user_req = await getUser(userLogin);
        portfolio_user_req.socket = userReq;

        io.in(userRes.socketId).emit('requestInvite_client', userReq, portfolio_user_req)
    })

    socket.on("responseInvite_server", async ( res, userReq, userRes, userLogin, portfolio_user_req ) => {
        console.log('Приглашение от ' + userReq)
        console.log('Приглашение для ' + userRes)
        if (res) {
            let portfolio_user_res = await getUser(userLogin);
            portfolio_user_res.socket = userRes;

            const room = {
                id: Math.random(),
                capacity: 10,
                chat: [],
            };
            rooms.push(room);
            console.log("Room created: " + room.id);

            const arrPlayers = [portfolio_user_req, portfolio_user_res];
            let role = getRandomInt(0, 2);
            arrPlayers[0].role = role === 0 ? "circle" : "cross";
            arrPlayers[1].role = role !== 0 ? "circle" : "cross";

            socket.emit('join_room_client', room, arrPlayers)
            io.in(userReq).emit('join_room_client', room, arrPlayers)
        } else {
            io.in(userReq).emit('responseInvite_client', {res, userRes})
        }
    });

    socket.on("join_room_server", async (roomId) => {
        socket.join(roomId); 
        console.log(`user ${socket.id} joined room: ${roomId}`);

        usersOnline.forEach((user)  => {
            if (user.socketId === socket.id) {
                user.status = 2;
            }
        })
        const newUsersOnline = await getAllUsers(usersOnline)
        socket.broadcast.emit("updateUsersOnline", newUsersOnline);

        socket.emit('start_game')
    });

    socket.on("out_room_server", async (room) => {
        socket.leave(room.id);
        rooms = rooms.filter((elem) => elem.id !== room.id);

        usersOnline.forEach((user)  => {
            if (user.socketId === socket.id) {
                user.status = 0;
            }
        })
        const newUsersOnline = await getAllUsers(usersOnline)
        socket.broadcast.emit("updateUsersOnline", newUsersOnline);
        io.to(room.id).emit("disconnect_room");
    })

    socket.on("message", (payload) => {
        console.log(`Message in ${payload.room.id} from ${socket.id} : ${payload.message}`);
        rooms.map((room) => {
          if (room.id === payload.room.id) {
            singleChat = { 
                message: payload.message, 
                name: payload.nameUser,
                role: payload.roleUser,
                time: payload.time
            };
            room.chat.push(singleChat);
            payload.chat = room.chat;
          }
        });
        
        io.to(payload.room.id).emit("chat", payload);
        io.to(payload.room.id).emit("test_room_chat");
    });

    socket.on("move_player_server", (room, squares, playersRoom, time) => {
        const winner = calculateWinners(squares) 
        let draw = null;

        if ((squares.some((element) => isEmptyObj(element)) === false) && (winner === null)) {
            draw = true;
            console.log(playersRoom)
        }

        if (draw  || winner !== null ) {
            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };

            const date = new Date().toLocaleDateString(options).split(".");;

            let historyArr = playersRoom.map(((player) => {
                let win = false;
                if (winner !== null) {
                    win = player.id === winner[0].id && true;
                }
                return {
                    id: player.id,
                    name: player.name,
                    role: player.role,
                    winner: win
                }
            }));

            historyArr[2] = time;
            historyArr[3] = `${date[2]}-${date[1]}-${date[0]}`;

            addHistoryGame(historyArr)
        }

        io.to(room.id).emit("move_player_client", squares, winner, draw);
    })

    socket.on("repeatInvite_server", (userReq, userRes) => {
        io.in(userRes).emit('repeatInvite_client', userReq);
    })

    socket.on("repeatResponse_server", (res, userReq, room) => {
        if (res) {
            io.to(room.id).emit("newGame");
        } else {
            io.in(userReq).emit("repeatResponse_client");
        }
    })

    socket.on("block_user_server", async (player) => {
        usersBlocked.push({
            login: player.login,
            status: 1
        })
        const newUsers = await getUpdateAllUsers(usersOnline, usersBlocked);

        let socketBlocked;
        usersOnline.forEach((user) => {
            if (user.login === player.login) {
                socketBlocked = user.socketId
            }
        })

        io.in(socketBlocked).emit('message_block')

        socket.broadcast.emit("updateUsersOnline", newUsers);
    })

    socket.on("unlock_user_server", async (player) => {
        usersBlocked = usersBlocked.filter((user) => user.login !== player.login)

        const newUsers = await getUpdateAllUsers(usersOnline, usersBlocked);

        socket.broadcast.emit("updateUsersOnline", newUsers);
    })
})

app.use(cors()); 
app.use(express.json());
app.use(router); 

app.use(errorHandlingMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate(); 
        await sequelize.sync(); 
        http.listen(PORT, () => console.log(`Start server on port:${PORT}`)); 
    }
    catch (error) {
        console.log(error);
    }
};

start();