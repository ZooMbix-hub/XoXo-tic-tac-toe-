/* проверка токена на валидность */

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // нужны только GET|POST|DELETE|PUT
    if (req.method === 'OPTIONS') { 
        next();
    }

    try {
        // получение токена из запроса
        const token = req.headers.authorization.split(' ')[1]; 
        if (!token) {
            res.status(401).json({ message: 'не авторизован' })
        }

        // проверка токена на валидность сравнивая с ключом сервера
        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        req.user = decoded;
        next();
    }
    catch(error) {
        res.status(401).json({ message: 'не авторизован' })
    }
}