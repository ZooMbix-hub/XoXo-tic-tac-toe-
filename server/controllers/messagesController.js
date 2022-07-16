const { Messages } = require('../models/models');

class MessagesController {

    async getMessages(req, res) {
        const types = await Messages.findAll().then((res) => { console.log(res) });;
        return res.json(types);
    }

    async addMessages(req, res) {
        const { userId, senderName, messageText, createdAt } = req.body; 
        if (!userId || !senderName || !messageText || !createdAt) {  
            return next(ApiError.badRequest('Некорректный ввод'));
        }

        const message = await Messages.create({ userId, senderName, messageText, createdAt }).then((res) => { console.log(res) });;  
        
        return res.json({ 
            userId: userId, 
            senderName: senderName,
            messageText: messageText,
            createdAt: createdAt
        });
    }

    async removeMessages(req, res) {
        const { messageId } = req.body; 

        const message = await Messages.destroy({
            where: {
                messageId: messageId
            }
        }).then((res) => { console.log(res); });

        return res.json({
            messageId: messageId
        });
    }
}

module.exports = new MessagesController();