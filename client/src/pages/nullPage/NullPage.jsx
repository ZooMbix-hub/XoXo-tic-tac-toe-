import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NullPageStyle.scss'

const NullPage = () => {
    const navigate = useNavigate();

    return (
        <div className='nullPage'>
            <div className='nullPage-container'>
                <img src="/img/nullPage2.svg" alt="" />
                <p id='null-title'>Страница не найдена :(</p>
                <p id='null-ref'>Перейти на страницу <span onClick={() => navigate('/login')}>авторизации</span></p>
            </div>
        </div>
    )
}

export default NullPage