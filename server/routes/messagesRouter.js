const Router = require('express');
const router = new Router();
const messagesController = require('../controllers/messagesController');

router.get('/', messagesController.getMessages);
router.post('/', messagesController.addMessages);
router.delete('/', messagesController.removeMessages);

module.exports = router;