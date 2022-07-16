const Router = require('express');
const router = new Router();
const historyController = require('../controllers/historyController');

router.get('/', historyController.getHistory);

module.exports = router;