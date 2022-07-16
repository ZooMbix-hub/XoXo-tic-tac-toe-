import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Form from '../../components/form/Form';
import './AuthStyle.scss';
import './AuthAdaptive.scss'; 

const Auth = () => {
	const location = useLocation();
	const isLogin = location.pathname === '/login';

	return (
		<div className='auth'>
			<div className='container-auth'>
				<img src="/img/dog-login.svg" alt="" className='img-auth'/>
				<p className='title-auth'>{isLogin ? 'Войдите в игру' : 'Регистрация'}</p>
				<Form isLogin={isLogin} />

				{isLogin ?
				<p className='ref-reg'>Нет аккаунта? <NavLink to={'/registration'}>Зарегистрироваться</NavLink></p>
				:
				<p className='ref-reg'>Есть аккаунт? <NavLink to={'/login'}>Войти</NavLink></p>
				}
			</div>
		</div>
	)
}
  
export default Auth
