const bcrypt = require('bcrypt'); // шифрование паролей в бд
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const { User, UsersBlocked } = require('../models/models');

const generateJwt = (id, login, role) => { // создание токена
    return jwt.sign({ id, login, role }, process.env.SECRET_KEY, { expiresIn: '12h' });
}

class UserController {
    async registration(req, res, next) {
        // получение данных с тела запроса
        const { name, age, gender, login, password, role, createdAt, updatedAt } = req.body; 
        if (!name || !age || !gender || !login || !password) { 
            // проверка на наличие данных 
            return next(ApiError.badRequest('Некорректный ввод'));
        }

        // поиск на существующиего в бд
        const candidate = await User.findOne({ where: {login} }); 
        if (candidate) {
            return next(ApiError.badRequest('Пользователь существует'))
        }

        // хешированние пароля (5 - кол-во хэш.)
        const hashPassword = await bcrypt.hash(password, 5); 
        // создание в бд строки
        const user = await User.create({ name, age, gender, login, password: hashPassword, role, createdAt, updatedAt });  
        
        // создание токена для пароля
        const token = generateJwt(user.id, user.login, user.role); 
        return res.json({ token });
    }

    async login(req, res, next) {
        const { login, password } = req.body;

        const userAuth = await User.findOne({ where: {login} });
        if (!userAuth) {
            return next(ApiError.badRequest('Пользователь не найден'));
        }

        const userBlock = await UsersBlocked.findOne({ where: {login} });
        if (userBlock) {
            return next(ApiError.badRequest('Пользователь заблокирован'));
        }

        // проверка пароля
        let comparePassword = bcrypt.compareSync(password, userAuth.password);  
        if (!comparePassword) {
            return next(ApiError.badRequest('Пароль неверный'));
        }

        const token = generateJwt(userAuth.id, userAuth.login, userAuth.role);
        return res.json({ token })
    }

    // генерация нового токена и отправка его на клиент
    async check(req, res, next) { 
        const loginBlock = req.user.login;
        const userBlock = await UsersBlocked.findOne({ where: {login: loginBlock} });
        if (userBlock) {
            return next(ApiError.badRequest('Пользователь заблокирован'));
        }
        
        const token = generateJwt(req.user.id, req.user.login, req.user.role); 
        return res.json({ token });
    }

}

module.exports = new UserController();