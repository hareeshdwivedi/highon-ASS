import React, { useState } from "react";
import Picker from "emoji-picker-react";

import Happy from "../assets/icons/happy.png";
import Send from "../assets/icons/send.png";
const ChatInput = ({ sendMsg, message, typingHandler, setMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const emojiHandler = (e) => {
    let msg = message;
    msg += e.emoji;
    setMessage(msg);
  };

  const sendMsgHandler = (event) => {
    event.preventDefault();

    if (message.length > 0) {
      sendMsg(message);
      setMessage("");
    }
  };
  return (
    <div className="chat-input-container">
      <div className="input-container">
        <div className="emojis-container">
          <img src={Happy} onClick={() => toggleEmojiPicker()} />
          {showEmojiPicker && (
            <Picker onEmojiClick={emojiHandler} theme="dark" />
          )}
        </div>
        <form onSubmit={(e) => sendMsgHandler(e)}>
          <div className="input">
            <input
              type="text"
              className="input-text"
              value={message}
              onChange={(e) => typingHandler(e)}
            />
          </div>
          <button type="submit" className="send-container">
            <img src={Send} onClick={(e) => sendMsgHandler(e)} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
