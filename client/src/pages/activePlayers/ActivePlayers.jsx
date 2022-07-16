import React, { useContext, useEffect, useState } from 'react';
import ActivePlayer from '../../components/ActivePlayer';
import { ContextAuth } from '../../App';
import './ActivePlayersStyle.scss';
import './ActivePlayersAdaptive.scss';

const ActivePlayers = () => {
	const [checkFree, setCheckFree] = useState(false);
	const [users, setUsers] = useState([]);
	const {
		userProfile,
		invitePlayer,
		setInvitePlayer,
		invitePlayers, 
		socket } = useContext(ContextAuth);

	useEffect(() => {
		socket.emit('getUsersOnline');

		socket.on("getUsersOnline", (usersData) => {
			setUsers([...usersData]);  
		});

	}, []);

	useEffect(() => {
		socket.on("updateUsersOnline", (users) => {
			setUsers(users); 
		});
	}, [users])
	
	useEffect(() => {
		if (invitePlayers.length !== 0) {
			const newArr = users;
			newArr.forEach((element) => {
				if (element.socketId == invitePlayer) {
				delete element.statusInvite;
				}    
			});
			setUsers([...newArr]);
			setInvitePlayer("");
		}
	}, [invitePlayer])
	
	const inviteUser = (user) => {
		socket.emit('invitePlayer_server', socket.id, user, userProfile.login)
	}

	return (
		<div className='activePlayers'>
			<div className='activePlayers-container'>
				<div className='activePlayers-header'>
					<p className='title-block'>Активные игроки</p>
					<div className='activePlayers-header-container'>
						<p>Только свободные</p>
						<div className='checbox-container'>
							<input type="checkbox" id="switch" onClick={() => setCheckFree(!checkFree)}/>
							<label htmlFor="switch">Toggle</label>
						</div>
					</div>
				</div>
				<div className='activePlayers-list'>
					{checkFree ? users.filter(player => player.status === 0).map((player, i) => ( 
						<ActivePlayer 
						key={i} 
						users={users}
						setUsers={setUsers}
						player={player} 
						inviteUser={inviteUser}
						/>
					))
					:
					users.map((player, i) => (
						<ActivePlayer 
						key={i} 
						users={users}
						setUsers={setUsers}
						player={player} 
						inviteUser={inviteUser}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default ActivePlayers