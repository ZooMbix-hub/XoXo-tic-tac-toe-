import React, { useContext, useEffect, useRef, useState } from 'react';
import { ContextAuth } from '../../App';
import './ChatStyle.scss';
import Message from './Message';


const Chat = ({portfolio}) => {
  const { socket, room } = useContext(ContextAuth);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const divRef = useRef(null);

  const sendMessage = async () => {
		const time = new Date().toLocaleTimeString().slice(0,-3);
		const nameUser = portfolio.name;
		const roleUser = portfolio.role;

		const payload = { 
			message, 
			room, 
			time,
			nameUser,
			roleUser
		};

		socket.emit("message", payload);
		setMessage(""); 

		socket.on("chat", (payloadd) => {
			setChat(payloadd.chat); 
		});

		scrollView();
	};

	useEffect(() => {
		socket.on("chat", (payload) => {
			setChat(payload.chat); 
		});

		scrollView();

	}, [chat])

	const scrollView = () => {
		divRef?.current?.scrollIntoView({ behavior: "smooth" });
	}

	return (
		<div className='chat-container'>
			<form className='add-message' onSubmit={(e) => e.preventDefault()}>
				<input type="text" 
					placeholder='Сообщение…'  
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					value={message}
				/>
				<button onClick={() => sendMessage()} type="submit"><img src="/img/Add-message.svg" alt="" /></button>
			</form>
			<div className='messages-wrapper' >
				{chat.length === 0 ?
				<p className='clear-chat'>Сообщений еще нет</p>
				:
				<div className='messages-block' >
					{chat.map((message, i) => (
					<Message message={message} key={i} />
					))}
					
					<div id='scroll_dawn' ref={divRef}></div>
				</div>
				}
			</div>
		</div>
	)
}

export default Chat