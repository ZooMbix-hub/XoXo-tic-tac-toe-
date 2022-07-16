import {$authHost, $host} from './index';
import jwt_decode from 'jwt-decode'; /* распарсинг токена */

/* регистрация */
export const registration = async (name, age, gender, login, password, createdAt, updatedAt) => {
    const {data} = await $host.post('/user/registration', {name, age, gender, login, password, createdAt, updatedAt}); /* отправка на сервер || data - тело запроса */
    localStorage.setItem('token', data.token); /* добавление токена из тела запроса в локальное хранилище */
    return jwt_decode(data.token);  /* распарсинг токена - объект */
}

/* вход */
export const login = async (login, password) => {
    const {data} = await $host.post('/user/login', {login, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

/* проверка на валидность токена */
export const check = async () => {
    const {data} = await $authHost.get('/user/auth');
    localStorage.setItem('token', data.token);  /* перезапись токена */
    return jwt_decode(data.token);
}
