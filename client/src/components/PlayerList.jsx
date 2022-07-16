import React, { useContext } from 'react';
import { blockUser, unlockUser } from '../http/listPlayersAPI';
import { ContextAuth } from '../App';

var options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const PlayerList = ({player, listUsers, setListUsers, setPlayersList, setModal, playerBan, setPlayerBan}) => {
	const {socket} = useContext(ContextAuth);
	/* const newArr = playersList; */
	const dateСr = new Date(player.dateCreate).toLocaleString("ru", options).replace(' г.', '');
	const dateUp = new Date(player.dateUpdate).toLocaleString("ru", options).replace(' г.', '');
	
	const OpenModal = () => {
		/* newArr.forEach((element) => {
		if (element.id == player.id) {
			return element.status = !element.status;
		}    
		});
		setPlayersList([...newArr]); */

		setPlayerBan(player)
		setModal(true);
	}

	const BlockPlayer = () => {
		console.log(player.role)
		if (player.role !== "ADMIN") {
			blockUser(player.name, player.login, player.role);
			listUsers.forEach(element => {
				if (element.login === player.login) {
					element.status = false;
				}
			});
			setListUsers([...listUsers]);
			socket.emit("block_user_server", player)
		}
    }

	const UnlockPlayer = () => {
		unlockUser(player.name, player.login, player.role);
		listUsers.forEach(element => {
			if (element.login === player.login) {
				element.status = true;
			}
		});
		setListUsers([...listUsers]);
		socket.emit("unlock_user_server", player)
	}

	return (
		<ul className='playerList'>
			<li className='name-playerList'>{player.name}</li>
			<li className='age-playerList'>{new Date().toLocaleDateString().slice(6,10) - player.age.slice(0,4)}</li>
			<li className='gender-playerList'><img src={player.gender === 'man' ? '/img/man.svg' : '/img/woman.svg'} alt="" /></li>
			<li className={player.status ? 'status-playerList statAct' : 'status-playerList statNoAct'}>{player.status ? 'Активен' : 'Заблокирован'}</li>
			<li className='dateCreate-playerList'>{dateСr}</li>
			<li className='dateEdit-playerList'>{dateUp}</li>
			{player.status ? 
			<li><button onClick={() => BlockPlayer()}>Заблокировать</button></li>
			:
			<li><button onClick={() => UnlockPlayer()}><img src="/img/ban.svg" alt="" />Разблокировать</button></li>
			}   
		</ul>
	)
}

export default PlayerList