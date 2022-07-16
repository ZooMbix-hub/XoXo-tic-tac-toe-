import {$authHost} from './index';

export const blockUser = async (name, login, role) => {
    const {data} = await $authHost.post('/listPlayers/block', {name, login, role});
    return data;
}

export const unlockUser = async (name, login, role) => {
    const {data} = await $authHost.post('/listPlayers/unlock', {name, login, role});
    return data;
}

export const getUsersBlock = async () => {
    const {data} = await $authHost.get('/listPlayers/allBlocked');
    return data;
}