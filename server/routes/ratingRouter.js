const Router = require('express');
const router = new Router();
const ratingController = require('../controllers/ratingController');

router.get('/all', ratingController.getAll);

module.exports = router;