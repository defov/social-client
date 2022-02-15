import React from 'react';
import TimeAgo from 'react-timeago';
import './message.css';

const Message = ({ message, own }) => {
    return (
        <div className={`message ${own && 'own'}`}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src="/assets/person/noAvatar.png"
                    alt=""
                />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom"><TimeAgo date={message.createdAt}/></div>
        </div>
    );
};

export default Message;
