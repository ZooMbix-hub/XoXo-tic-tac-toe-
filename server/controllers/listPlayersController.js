const { UsersBlocked } = require('../models/models');

class ListPlayersController {

    async addUserBlock(req, res) {

        const { name, login, role } = req.body; 
        if (!name || !login || !role) {  
            return next(ApiError.badRequest('Некорректный ввод'));
        }
        const user = await UsersBlocked.create({ name, login, role }); 
        
        return res.json({ user });
    }

    async removeUserBlock(req, res) {

        const { name, login, role } = req.body; 
        if (!name || !login || !role) {  
            return next(ApiError.badRequest('Некорректный ввод'));
        }
        const user = await UsersBlocked.destroy({where: {login}});
        
        return res.json({ user });
    }

    async getAllBlocked(req, res) {
        
        const types = await UsersBlocked.findAll();
        return res.json(types);
    }
}

module.exports = new ListPlayersController();