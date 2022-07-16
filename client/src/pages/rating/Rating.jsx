import React, { useEffect, useState } from 'react';
import PlayerRating from '../../components/PlayerRating';
import Loading from '../../components/loading/Loading';
import './RatingStyle.scss';
import './RatingAdaptive.scss';
import { getAll } from '../../http/ratingAPI';

const Rating = () => {
	const [loading, setLoading] = useState(true);
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		getAll().then((data) => {
		setPlayers(data);
		}).finally(() => setLoading(false));
		
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className='rating'>
			<div className='container-rating'>
				<p className='title-block'>Рейтинг игроков</p>
				<div className='list-rating'>
					<ul className='player-rating player-rating-zero'>
						<li className='name-rating'>ФИО</li>
						<li className='coutGames-rating'>Всего игр</li>
						<li className='coutWin-rating'>Победы</li>
						<li className='coutLos-rating'>Проигрыши</li>
						<li className='procWin-rating'>Процент побед</li>
					</ul>
					{players.sort((a, b) => b.countGamesWin - a.countGamesWin).map((player, i) => (
						<PlayerRating key={i} player={player}/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Rating