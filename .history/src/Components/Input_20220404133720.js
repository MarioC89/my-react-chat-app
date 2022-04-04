import React, { useState } from "react";
import Picker from 'emoji-picker-react';

const Input = ({ onSendMessage }) => {
  const [textInputs, setTextInputs] = useState("");

  const [chosenEmoji, setChosenEmoji] = useState(null);

  function onChange(e) {
    e.preventDefault();
    setTextInputs(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    
    onSendMessage(textInputs);
  }

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(emojiObject);
    setTextInputs((prevValue) => `${prevValue}${emojiObject.emoji}`)
  }



  return (
    <div className="Input">
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          onChange={(e) => onChange(e)}
          value={textInputs}
          type="text"
          placeholder="Send message..."
        />
        <Picker onEmojiClick={onEmojiClick} />
        <div>
            
        </div>
        <br />
        <button>Send</button>
      </form>
    </div>
  );
};



export default Input;