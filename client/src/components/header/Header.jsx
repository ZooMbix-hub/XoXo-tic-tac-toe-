import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './HeaderStyle.scss';
import BurgerMenu from './BurgerMenu';
import { ContextAuth } from '../../App';

const Header = () => {
  const {
    isAdmin,
    setIsAuth, 
    setIsAdmin,
    userProfile,
    setPlayersRoom,
    setJoinedRoom, 
    setInvitePlayer,
    setRoom,
    isMobile, isTablet, isDesktop,
    socket } = useContext(ContextAuth);
  const navigate = useNavigate();

  const logOut = () => {
    setIsAdmin(false);
    setIsAuth(false);
    navigate('/login');
    socket.emit('disconUsersOnline');
    localStorage.removeItem('token');
  }

  useEffect(() => {
    socket.on('requestInvite_client', (userReq, portfolio_user_req) => {
      const res = window.confirm(`Игрок ${portfolio_user_req.name} приглашает вас в игру.\nПринять?`);
      socket.emit('responseInvite_server', res, userReq, socket.id, userProfile.login, portfolio_user_req)
    })

    socket.on('responseInvite_client', ({res, userRes}) => {
      setInvitePlayer(userRes)
    })

    socket.on('join_room_client', (room, arrPlayers) => {
      setPlayersRoom(arrPlayers)
      setRoom(room)
      socket.emit('join_room_server', room.id)
    })

    socket.on('start_game', () => {
      setJoinedRoom(true);
      navigate('/')
    })
    
    socket.on("message_block", () => {
      alert("BAN!");
      setIsAuth(false);
    })

  }, [])

  return (
    <>
      <header>
        {isDesktop && 
          <div className='header'>
            <div className='logo-header'>
              <img src="/img/header-logo.svg" alt="" />
            </div>
            <ul className='navigate-header'>
              <li><NavLink to="/" className='nav-item'>Игровое поле</NavLink></li>
              <li><NavLink to="/rating" className='nav-item'>Рейтинг</NavLink></li>
              <li><NavLink to="/activePlayers" className='nav-item'>Активные игроки</NavLink></li>
              <li><NavLink to="/history" className='nav-item'>История игр</NavLink></li>
              {isAdmin && <li><NavLink to="/listPlayers" className='nav-item'>Список игроков</NavLink></li>}
            </ul>
            <div className='logo-header'>
              <button className='logo-out' onClick={() => logOut()}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > 
                  <path d="M10.79 16.29C11.18 16.68 11.81 16.68 12.2 16.29L15.79 12.7C16.18 12.31 16.18 11.68 15.79 11.29L12.2 7.7C11.81 7.31 11.18 7.31 10.79 7.7C10.4 8.09 10.4 8.72 10.79 9.11L12.67 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13H12.67L10.79 14.88C10.4 15.27 10.41 15.91 10.79 16.29ZM19 3H5C3.89 3 3 3.9 3 5V8C3 8.55 3.45 9 4 9C4.55 9 5 8.55 5 8V6C5 5.45 5.45 5 6 5H18C18.55 5 19 5.45 19 6V18C19 18.55 18.55 19 18 19H6C5.45 19 5 18.55 5 18V16C5 15.45 4.55 15 4 15C3.45 15 3 15.45 3 16V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#373745"/>
                </svg>
              </button>
            </div>
          </div>
        }
        {(isTablet || isMobile) &&
          <BurgerMenu logOut={logOut} />
        }
      </header>
      <Outlet />
    </>
  )
}

export default Header