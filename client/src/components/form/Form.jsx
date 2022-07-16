import React, { useContext } from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate } from 'react-router-dom';
import { ContextAuth } from '../../App';
import { login, registration } from '../../http/userAPI';
import './FormStyle.scss';

const Form = ({isLogin}) => {
	const {setIsAuth, setIsAdmin, setUserProfile, socket} = useContext(ContextAuth);
	const navigate = useNavigate();

	let date = new Date().toLocaleDateString().split('.');

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset
	} = useForm({
		mode: isLogin ? 'onBlur' : 'onChange',
	});

	const onSubmit = (data) => {
		alert(JSON.stringify(data))
		reset();
	};

	const click = async (data) => {
		try {
			let userData;
			if (isLogin) {
				userData = await login(data.login, data.password);      
			} else {
				userData = await registration(
				data.name, 
				data.age, 
				data.gender, 
				data.login, 
				data.password, 
				`${date[2]}-${date[1]}-${date[0]}`, 
				`${date[2]}-${date[1]}-${date[0]}`
				);
			}
		
			setIsAuth(true);
			if (userData.role === "ADMIN") {
				setIsAdmin(true)
			}
			setUserProfile({
				login: userData.login,
				role: "USER"
			})
			socket.emit('setUsersOnline', userData.login)
			navigate('/rating');
		} 
		catch (e) {
			alert(e.response.data.message);
			console.log(data)
		}
	}

	return (
		<form onSubmit={handleSubmit(click)} className="form-auth">
		<div className='field-form'>
			<input 
				className={!errors?.login ? 'input-form' : 'input-form input-err'} 
				placeholder='Логин'
				type='text'
				{...register('login', {
					required: "Поле обязательно к заполнению",
				})} 
			/>
			
			{errors?.login && <p className='error-form'>{errors?.login?.message || "Error!"}</p>}
		</div>
		
		<div className='field-form'>
			<input 
				className={!errors?.password ? 'input-form' : 'input-form input-err'} 
				placeholder='Пароль' 
				type='password'
				autoComplete="on"
				{...register('password', {
					required: "Поле обязательно к заполнению",
				})} 
			/>

			{errors?.password && <p className='error-form'>{errors?.password?.message || "Error!"}</p>}
		</div>

		{!isLogin &&
			<>
			<div className='field-form'>
				<input 
					className={!errors?.name ? 'input-form' : 'input-form input-err'} 
					placeholder='Имя'
					type='text'
					{...register('name', {
						required: "Поле обязательно к заполнению",
					})} 
				/>
				
				{errors?.name && <p className='error-form'>{errors?.name?.message || "Error!"}</p>}
			</div>

			<div className='field-form'>
				{/* <input 
				className={!errors?.age ? 'input-form' : 'input-form input-err'} 
				placeholder='Возраст'
				type='text'
				{...register('age', {
					required: "Поле обязательно к заполнению",
				})} 
				/> */}

				<input className={!errors?.age ? 'input-form' : 'input-form input-err'} 
					type="date"              
					placeholder='Возраст'
					{...register('age', {
						required: "Поле обязательно к заполнению",
					})} 
				/>
				
				{errors?.age && <p className='error-form'>{errors?.age?.message || "Error!"}</p>}
			</div>

			<div className='gender-block'>
				<div className='gender-radio-bl'>
					<label htmlFor="woman">
						<input
							{...register("gender", {
								required: "Поле обязательно к заполнению",
							})}
							type="radio"
							name="gender"
							value="woman"
							id="woman"
						/>
						<img src="/img/woman.svg" alt="" />
					</label>
					<label htmlFor="man">
						<input
							{...register("gender", {
								required: "Поле обязательно к заполнению",
							})}
							type="radio"
							name="gender"
							value="man"
							id="man"
						/>
						<img src="/img/man.svg" alt="" />
					</label>
				</div>
			</div>
			</>
		}
		
		<input className='btn-form' type="submit" disabled={!isValid} value={isLogin ? "Войти" : "Зарегистрироваться"} />
		</form>
	)
}

export default Form