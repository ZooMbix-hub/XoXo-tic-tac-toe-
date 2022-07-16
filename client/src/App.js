import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {authRoutes, adminRoutes, publicRoutes} from './routes';
import './style/App.css';
import Auth from './pages/auth/Auth';
import NullPage from './pages/nullPage/NullPage';
import Header from './components/header/Header';
import Field from './pages/field/Field';
import { check } from './http/userAPI';
import Loading from './components/loading/Loading';
import jwt_decode from 'jwt-decode';
import io from 'socket.io-client';

import { useMatchMedia } from "./hooks";

export const ContextAuth = createContext();

const socket = io("http://localhost:5000");

function App() {
  // состояние авторизации пользователя
  const [isAuth, setIsAuth] = useState(false);
  // состояние роли администратора
  const [isAdmin, setIsAdmin] = useState(false);
  // состояние блокировки пользователя
  const [isBlock, setIsBlock] = useState(false);
  // состояние массива игроков в комнате
  const [playersRoom, setPlayersRoom] = useState([]);
  // состояние загрузочного экрана
  const [loading, setLoading] = useState(true);
  // состояние статуса присоединения к комнате
  const [joinedRoom, setJoinedRoom] = useState(false);
  // состояние комнаты игроков
  const [room, setRoom] = useState();
  // состояние 
  const [userProfile, setUserProfile] = useState();

  const [invitePlayer, setInvitePlayer] = useState();
  const [invitePlayers, setInvitePlayers] = useState([]);

  const { isMobile, isTablet, isDesktop } = useMatchMedia();

  useEffect(() => {
    check().then(() => {  
      setIsAuth(true);
    }).finally(() => setLoading(false)).catch((e) => alert(e.response.data.message)); /* ? */

    if (localStorage.getItem('token') !== null) {
      var token = localStorage.getItem('token');
      var decoded = jwt_decode(token);
      if (decoded.role === "ADMIN") {
        setIsAdmin(true)
      }
      setUserProfile(decoded)
      socket.emit('setUsersOnline', decoded.login);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <ContextAuth.Provider value={{ 
          isAuth, 
          setIsAuth,
          isAdmin,
          setIsAdmin,
          userProfile, 
          setUserProfile,
          
          playersRoom, 
          setPlayersRoom,
          joinedRoom, 
          setJoinedRoom,
          
          invitePlayer, 
          setInvitePlayer,
          invitePlayers, 
          setInvitePlayers,

          room, 
          setRoom,
          isMobile, isTablet, isDesktop, 
          socket, 
        }}>
          <Routes>
            {isAuth &&
              <Route path='/' element={<Header/>}>
                <Route index element={<Field/>}/>
                {
                  isAdmin ? 
                  adminRoutes.map(({path, component}, i) => 
                    <Route  key={path} path={path} element={component}/>
                  )
                  :
                  authRoutes.map(({path, component}, i) => 
                    <Route  key={path} path={path} element={component}/>
                  )
                }
              </Route>
            }
            {publicRoutes.map(({path, component}) => 
              <Route key={path} path={path} element={component}/>
            )}
            <Route path='*' element={<NullPage/>}/>
          </Routes>
        </ContextAuth.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
