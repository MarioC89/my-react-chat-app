import React, { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Message = ({ messages, users }) => {
  console.log(messages)

  return (
    <div>
      <ul className="Messages-list">
        {messages.map((message) => (
          <div key={messages.indexOf(message)} className={(message.chatUserID === users)
            ? "Messages-message"
            : "Messages-message currentMember"}>
            <span
              className="avatar"
              style={{ backgroundColor: `${message.userColor}` }}
            />
            <div className="Message-content">
              <div className="username">{message.username}</div>
              <div className="text">{message.text}</div>
            </div>
            
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Message;
