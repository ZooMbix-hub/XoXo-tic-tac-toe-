/* объендинение всех маршрутов */

const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const ratingRouter = require('./ratingRouter');
const activePlayersRouter = require('./activePlayersRouter');
const historyRouter = require('./historyRouter');
const listPlayersRouter = require('./listPlayersRouter');

router.use('/user', userRouter);
router.use('/rating', ratingRouter);
router.use('/activePlayers', activePlayersRouter);
router.use('/history', historyRouter);
router.use('/listPlayers', listPlayersRouter);

module.exports = router;