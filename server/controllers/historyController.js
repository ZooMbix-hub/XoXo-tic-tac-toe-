const { HistoryGames } = require('../models/models');

class HistoryController {
    async getHistory(req, res) {
        let {limit, page} = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        
        let arrHistory = [];
        await HistoryGames.findAll({ raw:true }).then(history => {
            arrHistory = history.reverse();
        }).catch(err => console.log(err));
        let n = Number(offset) + Number(limit)
        
        const types = { 
            count: arrHistory.length, 
            rows: arrHistory.slice(offset, n).reverse() 
        }
        return res.json(types);
    }
}

module.exports = new HistoryController();