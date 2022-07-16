import React from 'react';
import { useContext } from 'react';
import { ContextAuth } from '../App';

const status = [
	{
		text: "Свободен",
		class: "p-free",
		active: true
	},
	{
		text: "Заблокирован",
		class: "p-block",
		active: false
	},
	{
		text: "Играет",
		class: "p-play",
		active: false
	},
	{
		text: "Вне игры",
		class: "p-out",
		active: false
	}
]

const ActivePlayer = ({ 
	player, 
	inviteUser, 
	users, 
	setUsers, 
}) => {
	const newArr = users;
	const {userProfile, joinedRoom, setInvitePlayers} = useContext(ContextAuth);

	const disableBtn = () => {
		if (status[player.status].active) {
		if (player.login === userProfile.login)
			return true; 
		else         
			return false;
		} else       
		return true;
	}
	
	const inviteClick = () => {
		/* блокировка отправки приглашений, если пользователь уже играет */
		if (!joinedRoom) {
		newArr.forEach((element) => {
			if (element.login == player.login) {
			element.statusInvite = true;
			}    
		});
	
		setUsers([...newArr]);
	
		setInvitePlayers([player])
	
		inviteUser(player);
		}
	}

	return (
		<ul className='activePlayer'>
			<li><p className='name-activePlayer'>{player.name}</p></li>
			<li><p className={`status-activePlayer ${status[player.status].class}`}>
				{status[player.status].text}
			</p></li>
			<li>{player.hasOwnProperty('statusInvite') ? 
			<button className='btnInvite-activePlayer btn-dis' 
				disabled={false}>
				Ожидание ответа
			</button>
			:
			<button 
				className={status[player.status].active ? 'btnInvite-activePlayer' : 'btnInvite-activePlayer btn-dis'} 
				disabled={disableBtn()}
				onClick={() => inviteClick()}>
				Позвать играть
			</button>}
			</li>
		</ul>
	)
}

export default ActivePlayer