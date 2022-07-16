import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextAuth } from '../../App';
import ModalWinnerDraw from '../modals/winner/ModalWinnerDraw';
import Motion from '../Motion';
import Square from '../square/Square';
import Timer from '../timer/Timer';
import './BoardStyle.scss';
import './BoardAdaptive.scss';
 
const Board = ({xIsNext, setXIsNext, playersArr, profile}) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [timer, setTimer] = useState(false);
    const [newTimer, setNewTimer] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(null);
    const [number, setNumber] = useState(0);
    const navigate = useNavigate();
    const { userProfile, playersRoom, room, setRoom, setJoinedRoom, socket, isMobile, isTablet } = useContext(ContextAuth);

    const handleClick = (index) => {
        const boardCopy = [...board];
        if (winner || boardCopy[index] || !xIsNext) return; 
        boardCopy[index] = profile;

        let min = (minutes >= 10) ? minutes : "0" + minutes;
        let sec = (seconds >= 10) ? seconds : "0" + seconds;
        let time = `00:${min}:${sec}`;

        socket.emit("move_player_server", room, boardCopy, playersRoom, time);
    }

    const repeatInvite = () => {
        let opponent;
        playersArr.forEach((player) => {
            if (player.login !== userProfile.login) {
                opponent = player.socket
            }
        })
        socket.emit("repeatInvite_server", socket.id, opponent)
    }

    const startNewGame = () => {
        setBoard(Array(9).fill(null));
        setTimer(false);
        setNewTimer(true);
        setWinner(null);
        setDraw(null);
    }
    
	const outGame = () => {
		socket.emit("out_room_server", room);
		navigate('/activePlayers');
		setJoinedRoom(false)
		setRoom(null);
		socket.removeAllListeners("repeatInvite_client");
		socket.removeAllListeners("repeatResponse_client");
		socket.removeAllListeners("disconnect_room");
	}

    useEffect(() => {
        socket.on("move_player_client", (squares, winner, draw) => {
            setBoard(squares);
            setWinner(winner);
            setDraw(draw);
            setTimer(true);
        })

        socket.on("repeatInvite_client", (userReq) => {
            const res = window.confirm(`Вас приглашают на повторную игру.\nПринять?`);
            socket.emit("repeatResponse_server", res, userReq, room);
        })

        socket.on("newGame", () => {
            startNewGame();
        })

        socket.on("repeatResponse_client", () => {
            alert("Игрок отклонил приглашение :(");
        })

        socket.on("disconnect_room", () => {
            alert('Игрок вышел из комнаты');
            outGame();
        })
    }, [])

    useEffect(() => {
        if(number !== 0) {
            setXIsNext(!xIsNext);
        } else {
            setNumber(number + 1);
        }
    }, [board])

    useEffect(() => {
        setTimer(false);
    }, [winner, draw])

    return (
        <div className='games-container'>
            <div className='timer-container'>
                <Timer 
                    timer={timer} 
                    newTimer={newTimer} 
                    seconds={seconds}
                    setSeconds={setSeconds}
                    minutes={minutes}
                    setMinutes={setMinutes}
                    setNewTimer={() => setNewTimer()}
                />
            </div>

            {(isTablet || isMobile) &&
                <Motion xIsNext={xIsNext} playersArr={playersArr} profile={profile}/>
            }
            
            <div className='board'>
                <div className='board-container'>
                {board.map((square, i) => (
                    <Square key={i} value={square} onClick={() => handleClick(i)} winner={winner} index={i}/>
                ))}
                </div>
            </div>

            {(draw || winner) &&
                <ModalWinnerDraw draw={draw} winner={winner} startNew ={() => repeatInvite()} outGame={outGame} />
            }
        </div>
    )
}

export default Board