import {$host} from './index';

export const getAll = async () => {
    const {data} = await $host.get('/rating/all');
    return data;
}