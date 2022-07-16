import React from 'react'

const Motion = ({xIsNext, playersArr, profile}) => {
	
	let opponent;
	playersArr.forEach((player) => {
		if (player.login !== profile.login) 
		opponent = player;
	})

	return (
		<div className='motion'>
			<p>Ходит <img src={xIsNext ? `/img/${profile.role}.svg` : `/img/${opponent.role}.svg`} alt="" />
				<span>{xIsNext ? profile.name : opponent.name}</span>
			</p>
		</div>
	)
}

export default Motion