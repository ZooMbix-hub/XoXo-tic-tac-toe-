import React, { useContext } from 'react'
import { ContextAuth } from '../App';

var options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const PlayersHistory = ({stories}) => {
	const {isDesktop, isTablet} = useContext(ContextAuth);

	let time = stories.timeGame.split(':');
	const data = new Date(stories.dateGame).toLocaleString("ru", options).replace(' г.', '');

	return (
		<ul className='players-history'>
			<li className='info-players-game'>
				<p>
					<img src={stories.roleFirst === 'cross' ? '/img/cross.svg' : '/img/circle.svg'} alt="" />
					{stories.nameFirst} 
					{stories.winnerFirst && <img src='/img/winner-history.svg' alt="" className='logo-win'/>}
				</p>
				{(isDesktop || isTablet) && <span>против</span> }
				<p>
					<img src={stories.roleSecond === 'cross' ? '/img/cross.svg' : '/img/circle.svg'} alt="" />
					{stories.nameSecond} 
					{stories.winnerSecond && <img src='/img/winner-history.svg' alt="" className='logo-win'/>}
				</p>
			</li>
			<li className='date-game'>{data}</li>
			<li className='time-game'>{`${time[1]} мин ${time[2]} сек`}</li>
		</ul>
	)
}

export default PlayersHistory