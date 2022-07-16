import { motion, AnimatePresence } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { ContextAuth } from '../../App';
import './ListPlayers.scss';
import './ListPlayersAdaptive.scss'

const ListPlayers = ({playersArr}) => {
    const {isMobile, isTablet, isDesktop} = useContext(ContextAuth); 
    const [openAcc, setOpenAcc] = useState(isDesktop);

    const styleBtnAcc = {
        transform: 'rotate(180deg)',
    };

    const getProcWin = (countGames, countWin) => {
        const procent = (100 * countWin) / countGames;
        if (isNaN(procent)) {
            return 0;
        } else {
            return Math.round(procent);
        }
    }

    return (
        <div className='list-players-container'>
            <div className='header-list-players'>
                <p className='title-block'>Игроки</p>
                {isMobile && 
                <button onClick={() => setOpenAcc(!openAcc)}>
                    <img src="/img/openListBoard.svg" className='imgAcc' style={!openAcc ? styleBtnAcc : {}} alt="" />
                </button>}
            </div>
            <AnimatePresence /* initial={false} */>
                {(openAcc || isDesktop || isTablet) && 
                <motion.div className='container-players'
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    style={{overflow: 'hidden'}}
                    transition={{duration: 0.3}}
                >
                    {playersArr.map((player) => (
                        <div className='list-player-item' key={player.id}>
                            <img src={`/img/${player.role}.svg`} alt="" />
                            <div className='info-player'>
                                <p className='player-name'>{player.name}</p>
                                {<p className='player-procentWin'>{getProcWin(player.countGames, player.countGamesWin)}% побед</p>}
                            </div>
                        </div>
                    ))}
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}

export default ListPlayers;