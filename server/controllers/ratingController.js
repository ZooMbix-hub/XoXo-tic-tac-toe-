const { User } = require('../models/models');

class RatingController {

    async getAll(req, res) {
        const types = await User.findAll();
        return res.json(types);
    }
}

module.exports = new RatingController();