import React, { useState } from "react";
import Picker from 'emoji-picker-react';

const Input = ({ onSendMessage }) => {
  const [textInputs, setTextInputs] = useState("");

  const [chosenEmoji, setChosenEmoji] = useState(null);

  function onChange(e) {
    setTextInputs(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    setTextInputs("");
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
        <div>
            {chosenEmoji ? (
              <span>You chose: {chosenEmoji.emoji}</span>
            ) : (
              <span>No emoji Chosen</span>
            )}
            <Picker onEmojiClick={onEmojiClick} />
         </div>
        <button>Send</button>
      </form>
    </div>
  );
};

export default Input;
