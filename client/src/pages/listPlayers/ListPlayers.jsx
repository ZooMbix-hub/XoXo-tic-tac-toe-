import React, { useEffect, useState } from 'react';
import ModalAddFriend from '../../components/modals/addFriend/ModalAddFriend';
import ModalBanned from '../../components/modals/banned/ModalBanned';
import PlayerList from '../../components/PlayerList';
import { getAll } from '../../http/ratingAPI';
import { getUsersBlock } from '../../http/listPlayersAPI';
import Loading from '../../components/loading/Loading';
import './ListPLayersStyle.scss';
import './ListPlayersAdaptive.scss';

const ListPlayers = () => {
	const [modal, setModal] = useState(false);
	const [playersDb, setPlayersDb] = useState([]);
	const [playersBlocked, setPlayersBlocked] = useState([]);
	const [listUsers, setListUsers] = useState([]);
	const [playerBan, setPlayerBan] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAll().then((data) => {
			setPlayersDb(data.map((data) => {
				return { 
					id: data.id,
					login: data.login,
					name: data.name, 
					age: data.age, 
					gender: data.gender, 
					status: true, 
					role: data.role,
					dateCreate: data.createdAt, 
					dateUpdate: data.updatedAt 
				}
			}));
		}).finally(() => setLoading(false));

		getUsersBlock().then((data) => {
			setPlayersBlocked(data)
		})
	}, []);

	useEffect(() => {
		if (playersDb.length !== 0) {
			if (playersBlocked.length) {
				const output = [...playersDb];
				playersBlocked.forEach((s) => {
					const index = playersDb.findIndex((o) => o.login === s.login);
					output[index].status = false;
				});
				setListUsers(output);
			} else {
				setListUsers(playersDb);
			}
		}

	}, [playersBlocked])

	useEffect(() => {
	}, [listUsers])

	if (loading) {
		return <Loading />;
	}

	return (
		<div className='listPlayers'>
			<div className='container-listPlayers'>
				<div className='header-listPlayers'>
					<p className="title-block">Список игроков</p>
					{/* <button className='btnAdd-listPlayers' onClick={() => setModal(true)}>Добавить игрока</button> */}
					{/* {modal && <ModalBanned visable={modal} setVisable={setModal} playerBan={playerBan}/>} */}
				</div>
				<div className="list-listPlayers">
					<ul className='playerList playerList-zero'>
						<li className='name-playerList'>ФИО</li>
						<li className='age-playerList'>Возраст</li>
						<li className='gender-playerList'>Пол</li>
						<li className='status-playerList'>Статус</li>
						<li className='dateCreate-playerList'>Создан</li>
						<li className='dateEdit-playerList'>Изменен</li>
					</ul>
					{listUsers.map((player) => (
						<PlayerList 
						key={player.id} 
						player={player} 
						listUsers={listUsers}
						setListUsers={setListUsers} 
						setPlayersList={setPlayersDb} 
						setModal={setModal}
						playerBan={playerBan}
						setPlayerBan={setPlayerBan}/>
					))}
				</div>
			</div>
		</div>
	)
}

export default ListPlayers