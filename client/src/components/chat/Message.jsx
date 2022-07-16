import React from 'react'

const Message = ({message}) => {
    return (
        <div className={`message-block ${message.role}`}>
            <div className='info-message-container'>
                <p className='name-message'>{message.name}</p>
                <p className='date-message'>{message.time}</p>
            </div>
            <p className='text-message'>{message.message}</p>
        </div>
    )
}

export default Message