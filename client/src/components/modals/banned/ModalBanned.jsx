import React from 'react';
import AnimateModal from '../AnimateModal';
import { blockUser } from '../../../http/listPlayersAPI';
import '../styleModal.scss'

const ModalBanned = ({setVisable, playerBan}) => {

    const CloseModal = () => {
        setVisable(false);
    };

    const BlockPlayer = () => {
        setVisable(false);
        blockUser(playerBan.name, playerBan.login, playerBan.role);
    }

    return (
        <AnimateModal nameClass="modal-Active" onClick={() => CloseModal()}>
            <div className='modal-container' onClick={(e) => e.stopPropagation()}>
                <button className='modal-btn-close' onClick={() => CloseModal()}>
                    <img src="/img/close.svg" alt="" />
                </button>
                <p className="modal-title">Вы действительно хотите заблокировать игрока <br/> {playerBan.name}</p>
                <div className='modal-container-btn'>
                    <button className='btn-form' onClick={() => BlockPlayer()}>Да</button>
                    <button className='btn-form' onClick={() => CloseModal()}>Нет</button>
                </div>
            </div>
        </AnimateModal>
    )
}

export default ModalBanned