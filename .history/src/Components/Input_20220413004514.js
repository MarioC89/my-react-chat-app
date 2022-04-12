import React, { useState } from "react";
import Picker from 'emoji-picker-react';
import emojiIcon from "./images/emoji.png"


const Input = ({ onSendMessage }) => {
  const [textInputs, setTextInputs] = useState("");

  const [emojiShown, setEmojiShown] = useState(false);

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

  const handleEmojiIcon = () => {
    setEmojiShown(!emojiShown)
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
          emojiShown && <Picker onEmojiClick={onEmojiClick}/>
        }
        <img className="emoji-icon" onClick={handleEmojiIcon} src={emojiIcon} alt="" />
        <br />
        <button>Send</button>
      </form>
    </div>
  );
};



export default Input;
