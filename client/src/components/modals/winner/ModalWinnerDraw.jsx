import AnimateModal from '../../AnimateModal';
import './ModalWinnerStyle.scss';
import './ModalAdaptive.scss';

const ModalWinner = ({draw, winner, startNew, outGame}) => {

	return (
		<AnimateModal nameClass="modalWin-Active">
			{winner &&
			<div className='modalWin-container'>
				<img src="/img/winner.svg" alt="" />
				<p className='name-win'>{winner[0]?.name} {winner[0]?.gender === 'man' ? 'победил' : 'победила'}!</p>
				<button className='btn-goNewGame' onClick={startNew}>Новая игра</button>
				<button className='btn-goMenu' onClick={() => outGame()}>Выйти в меню</button>
			</div>}
			
			{draw &&
			<div className='modalWin-container'>
				<p className='name-win'>Ничья !</p>
				<button className='btn-goNewGame' onClick={startNew}>Новая игра</button>
				<button className='btn-goMenu' onClick={() => outGame()}>Выйти в меню</button>
			</div>}
		</AnimateModal>
	)
}

export default ModalWinner