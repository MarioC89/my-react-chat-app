import React, { useState } from "react";
import Picker from 'emoji-picker-react';

const Input = ({ onSendMessage }) => {
  const [textInputs, setTextInputs] = useState("");

  const [emojiPickerShown, setEmojiPickerShown] = useState(false)

  function onChange(e) {
    setTextInputs(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    setTextInputs("");
    onSendMessage(textInputs);
  }

  const onEmojiClick = (event, emojiObject) => {
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
        {
          emojiPickerShown && <Picker onEmojiClick={onEmojiClick} />
        }
        <button>Send</button>
      </form>
    </div>
  );
};

export default Input;
