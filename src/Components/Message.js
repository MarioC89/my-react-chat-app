import React from "react";

const Message = ({ messages, users }) => {
  /* console.log(messages)  */

  return (
    <div className="msg-window">
      <ul className="Messages-list">
        {messages.map((message) => {
          /* console.log(message.currentTime); */
           return (
          <div key={messages.indexOf(message)} className={(message.chatUserID === users)
            ? "Messages-message currentMember"
            : "Messages-message"}>
            <span
              className="avatar"
              style={{ backgroundColor: `${message.user.randomColor}` }}
            />
            <div className="Message-content">
              <div className="username">{message.username}</div>
              <div className="text">
                <div>
                  {message.currentTime}
                </div>
                <div >
                  {message.text}
                </div>
              </div>
            </div>
            
          </div>
        )
        })}
      </ul>
    </div>
  );
};

export default Message;
