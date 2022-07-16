import {$host} from './index';

export const getHistory = async (page, limit = 6) => {
    const {data} = await $host.get('/history', {params: {
        page,
        limit
    }});
    return data;
}
