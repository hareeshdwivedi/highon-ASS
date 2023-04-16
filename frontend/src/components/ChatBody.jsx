import React, { useEffect, useRef } from "react";
import Lottie from "react-lottie-player";

import Animation from "../utils/typing-animation.json";
const ChatBody = ({ messages, isTyping, selectedUser }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });

    return () => {};
  }, [messages]);

  useEffect(() => {
    if (isTyping) {
      document.getElementById("typing-container").scrollIntoView();
    }
    return () => {};
  }, [isTyping]);

  return (
    <div className="chat-container-body">
      <div className="chat-image-container">
        <img src={selectedUser.avatarImage} alt="profile" />
        <p>Girish</p>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} ref={scrollRef}>
            <div className={`message ${msg.fromSelf ? "sended" : "received"}`}>
              <div className="content">
                <p>{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div id="typing-container">
            <Lottie
              autoFocus={true}
              animationData={Animation}
              style={{
                width: 75,
                height: 90,
                marginLeft: "-6px",
                marginBottom: "-28px",
              }}
              play
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBody;
