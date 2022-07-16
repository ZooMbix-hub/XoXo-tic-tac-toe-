import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ContextAuth } from '../../App';
import './BurgerStyle.scss';

const BurgerMenu = ({logOut}) => {
    const [open, setOpen] = useState(false);
    const {isAdmin} = useContext(ContextAuth);

    return (
        <>
            <div className='header' style={open ? {boxShadow: 'none' } : {}}>
                <div className='logo-header'>
                    <img src="/img/header-logo.svg" alt="" />
                </div>
                <button className={open ? 'active-burg' : 'btn-burger'} onClick={() => setOpen(!open)}>
                    <span />
                    <span />
                    <span />
                </button>
            </div>
            <div className='content-burger' style={open ? {transform: 'translateY(0)'} : {}}>
                <ul className='navigate-header'>
                    <li><NavLink to="/" className='nav-item'>Игровое поле</NavLink></li>
                    <li><NavLink to="/rating" className='nav-item'>Рейтинг</NavLink></li>
                    <li><NavLink to="/activePlayers" className='nav-item'>Активные игроки</NavLink></li>
                    <li><NavLink to="/history" className='nav-item'>История игр</NavLink></li>
                    {isAdmin && <li><NavLink to="/listPlayers" className='nav-item'>Список игроков</NavLink></li>}
                    <li><button className='nav-item logo-out' onClick={logOut}>
                        Выйти
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > 
                            <path d="M10.79 16.29C11.18 16.68 11.81 16.68 12.2 16.29L15.79 12.7C16.18 12.31 16.18 11.68 15.79 11.29L12.2 7.7C11.81 7.31 11.18 7.31 10.79 7.7C10.4 8.09 10.4 8.72 10.79 9.11L12.67 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13H12.67L10.79 14.88C10.4 15.27 10.41 15.91 10.79 16.29ZM19 3H5C3.89 3 3 3.9 3 5V8C3 8.55 3.45 9 4 9C4.55 9 5 8.55 5 8V6C5 5.45 5.45 5 6 5H18C18.55 5 19 5.45 19 6V18C19 18.55 18.55 19 18 19H6C5.45 19 5 18.55 5 18V16C5 15.45 4.55 15 4 15C3.45 15 3 15.45 3 16V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#373745"/>
                        </svg>
                    </button></li>
                </ul>
            </div>
        </>
    )
}

export default BurgerMenu