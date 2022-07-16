import React from 'react'

const PlayerRating = ({player}) => {

	const getProcWin = (countGames, countWin) => {
		let procWin = Math.round((countWin * 100) / countGames);
		return procWin = isNaN(procWin) ? 0 : procWin;
	}

	return (
		<ul className='player-rating'>
			<li className='name-rating'>{player.name}</li>
			<li className='coutGames-rating'>{player.countGames}</li>
			<li className='coutWin-rating'>{player.countGamesWin}</li>
			<li className='coutLos-rating'>{player.countGamesLos}</li>
			<li className='procWin-rating'>{getProcWin(player.countGames, player.countGamesWin)}%</li>
		</ul>
	)
}

export default PlayerRating