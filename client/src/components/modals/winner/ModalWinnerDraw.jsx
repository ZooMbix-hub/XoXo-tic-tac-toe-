import AnimateModal from '../AnimateModal';
import './ModalWinnerStyle.scss';
import './ModalAdaptive.scss';
import '../styleModal.scss'

const ModalWinner = ({draw, winner, startNew, outGame}) => {

	return (
		<AnimateModal nameClass="modal-Active">
			{winner &&
			<div className='modal-container'>
				<img src="/img/winner.svg" alt="" />
				<p className='name-win'>{winner[0]?.name} {winner[0]?.gender === 'man' ? 'победил' : 'победила'}!</p>
				<button className='btn-goNewGame' onClick={startNew}>Новая игра</button>
				<button className='btn-goMenu' onClick={() => outGame()}>Выйти в меню</button>
			</div>}
			
			{draw &&
			<div className='modal-container'>
				<p className='name-win'>Ничья !</p>
				<button className='btn-goNewGame' onClick={startNew}>Новая игра</button>
				<button className='btn-goMenu' onClick={() => outGame()}>Выйти в меню</button>
			</div>}
		</AnimateModal>
	)
}

export default ModalWinner