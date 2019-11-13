import React, { useState } from "react";
import uuid from "uuid/v4";
import './index.css';

const Input = ({ onSubmitMessage }) => {
    const [newMessageValue, setNewMessage] = useState('');

    const onSubmit = (event) => {
        if (!Boolean(newMessageValue.trim())) return;
        if (event.keyCode === 13 && event.shiftKey === false) {
            event.preventDefault();
            const newMessage = { id: uuid(), message: newMessageValue, timestamp: new Date() };
            setNewMessage('');
            onSubmitMessage(newMessage);
        }
    }

    return (
        <div className="chat-app__new-message">
            <textarea
                value={newMessageValue}
                onChange={(event) => setNewMessage(event.target.value)}
                onKeyDown={onSubmit}
                className="chat-app__new-message-input"
                placeholder="Message"
            />
        </div>
    )
}


export default Input;