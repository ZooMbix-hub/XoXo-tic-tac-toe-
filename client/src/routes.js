import Rating from './pages/rating/Rating';
import ActivePlayers from './pages/activePlayers/ActivePlayers';
import History from './pages/history/History';
import ListPlayers from './pages/listPlayers/ListPlayers';
import Auth from './pages/auth/Auth';

export const authRoutes = [
    {
        path: '/rating',
        component: <Rating/>
    },
    {
        path: '/activePlayers',
        component: <ActivePlayers/>
    },
    {
        path: '/history',
        component: <History/>
    }
]

export const adminRoutes = [
    {
        path: '/rating',
        component: <Rating/>
    },
    {
        path: '/activePlayers',
        component: <ActivePlayers/>
    },
    {
        path: '/history',
        component: <History/>
    },
    {
        path: '/listPlayers',
        component: <ListPlayers/>
    }
]

export const publicRoutes = [
    {
        path: '/',
        component: <Auth/>
    },
    {
        path: '/login',
        component: <Auth/>
    },
    {
        path: '/registration',
        component: <Auth/>
    },
]