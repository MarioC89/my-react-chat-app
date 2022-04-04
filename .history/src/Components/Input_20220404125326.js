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

  const EmojiData = ({ chosenEmoji }) => (
    <div>
      <strong>Unified:</strong> {chosenEmoji.unified}
      <br />
      <strong>Names:</strong> {chosenEmoji.names.join(', ')}
      <br />
      <strong>Symbol:</strong> {chosenEmoji.emoji}
      <br />
      <strong>ActiveSkinTone:</strong> {chosenEmoji.activeSkinTone}
    </div>
  );

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
            <Picker onEmojiClick={onEmojiClick} />
            {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />}
         </div>
        <button>Send</button>
      </form>
    </div>
  );
};



export default Input;
