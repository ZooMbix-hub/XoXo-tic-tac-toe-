import React, { useEffect, useState } from 'react';
import PlayerList from '../../components/PlayerList';
import { getAll } from '../../http/ratingAPI';
import { getUsersBlock } from '../../http/listPlayersAPI';
import Loading from '../../components/loading/Loading';
import './ListPLayersStyle.scss';
import './ListPlayersAdaptive.scss';

const ListPlayers = () => {
	const [playersDb, setPlayersDb] = useState([]);
	const [playersBlocked, setPlayersBlocked] = useState([]);
	const [listUsers, setListUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAll().then((data) => {
			setPlayersDb(data.map((elem) => {
				return { 
					id: elem.id,
					login: elem.login,
					name: elem.name, 
					age: elem.age, 
					gender: elem.gender, 
					status: true, 
					role: elem.role,
					dateCreate: elem.createdAt, 
					dateUpdate: elem.updatedAt 
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

	if (loading) {
		return <Loading />;
	}

	return (
		<div className='listPlayers'>
			<div className='container-listPlayers'>
				<div className='header-listPlayers'>
					<p className="title-block">Список игроков</p>
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
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default ListPlayers