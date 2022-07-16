import axios from "axios";

/* для запросов без авторизации */
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

/* каждому запросу автоматически подставляется токен */
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

/* подставление токена для каждого запроса */
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}

/* подключение для авторизованных */
$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}