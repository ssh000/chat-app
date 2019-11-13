import React, { useState, useEffect } from "react";
import classnames from "classnames";
import Input from './components/Input';
import { getData, sendData, localeDateFormat, localeTimeFormat } from './utils';

const useFetch = (url, defaultData) => {
  const [data, setData] = useState(defaultData);
  useEffect(() => {
    getData(url).then(setData);
  }, [url]);
  return data;
};

const App = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setConversation] = useState({ id: null });
  const conversations = useFetch(`conversation/user/${user.id}`, []);

  const loadConversation = (conversationId, limit = 100) => {
    setConversation({ id: conversationId });
    getData(`conversation/${conversationId}/message/limited?limit=${limit}&offset=0`).then(setMessages);
  }

  const onSubmitMessage = (message) => {
      const newMessage = { ...message, senderId: user.id };
      sendData(`conversation/${selectedConversation.id}/message/send`, newMessage);
      setMessages([newMessage, ...messages]);
  }

  const conversationClasses = (conversationId) => classnames("chat-app__conversation", { "chat-app__conversation--selected": conversationId === selectedConversation.id });
  const messageClasses = (userId) => classnames("chat-app__message", { "chat-app__message--me": userId === user.id });

  return (
    <div className="chat-app">
      <div className="chat-app__conversations">
        {conversations.map(({ conversation: { conversationId, name, lastseen } }) =>
          <div onClick={() => loadConversation(conversationId)} key={conversationId} className={conversationClasses(conversationId)}>
            <div className="chat-app__conversation-avatar" />
            <div className="chat-app__conversation-details">
              <div className="chat-app__conversation-name">
                {name || "Undefined"}
              </div>
              <div className="chat-app__conversation-last-seen">
                {localeDateFormat(new Date(lastseen))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="chat-app__chat">
        <div className="chat-app__messages">
          {messages.map(({ message, senderId, id, timestamp }) =>
            <div key={id} className={messageClasses(senderId)}>
              <div className="chat-app__message-text">{message}</div>
              <div className="chat-app__message-timestamp">{localeTimeFormat(new Date(timestamp))}</div>
            </div>
          )}
        </div>
        {selectedConversation.id && <Input onSubmitMessage={onSubmitMessage} />}
      </div>
    </div>
  );
}

export default App;
