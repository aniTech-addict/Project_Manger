import React from 'react';

const ChatMessage = ({ msg }) => {
    return (
        <div className={`message ${msg.role}`}>
            <div className="message-bubble">{msg.text}</div>
        </div>
    );
};

export default ChatMessage;
