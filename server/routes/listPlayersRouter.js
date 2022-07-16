const Router = require('express');
const listPlayersController = require('../controllers/ListPlayersController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const router = new Router();

router.post('/block', checkRoleMiddleware, listPlayersController.addUserBlock);
router.post('/unlock', checkRoleMiddleware, listPlayersController.removeUserBlock);
router.get('/allBlocked', checkRoleMiddleware, listPlayersController.getAllBlocked);

module.exports = router;