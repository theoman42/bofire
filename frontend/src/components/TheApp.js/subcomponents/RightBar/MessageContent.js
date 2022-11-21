// frontend/src/components/Navigation/index.js
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../../../../store/messageState1";
import "./RightBar.css";

function MessageContent() {
  const user = useSelector((state) => state.session.user);
  const messages = useSelector((state) => state.messages1);
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const [newText, setNewText] = useState("");
  const [type, setType] = useState("");
  const [tempId, setTempId] = useState("");
  const [messagesLoaded, setMessagesLoaded] = useState(false);

  useEffect(() => {
    setType(messages.type);
    setTempId(messages.id);
    setMessagesLoaded(JSON.stringify(messages) !== "{}");
  }, [messages]);

  const updateText = (e) => setNewText(e.target.value);

  const submitOnEnter = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      let payload = {
        userId: user.id,
        msg: newText,
      };
      dispatch(sendMessage(payload, type, tempId));
      setNewText("");
    }
  };

  return (
    <div className="right-bar-messaging-container">
      <div className="right-bar-messaging-tabs-container">
        <div className={`right-bar-tab-1 ${active === 1 ? "active-m" : ""}`}>
          Tab 1
        </div>
        <div className={`right-bar-tab-2 ${active === 2 ? "active-m" : ""}`}>
          Tab 2
        </div>
        <div className={`right-bar-tab-3 ${active === 3 ? "active-m" : ""}`}>
          Tab 3
        </div>
      </div>
      <div className="messages-wrapper">
        {messagesLoaded &&
          messages?.messages.map((message) => {
            return (
              <div className="single-message-styling">
                <strong>{message.User.username}</strong>
                <span>{message.messageBody}</span>
              </div>
            );
          })}
      </div>
      <div className="message-input-container">
        <textarea
          placeholder="message..."
          required
          value={newText}
          onChange={updateText}
          onKeyDown={submitOnEnter}
        />
      </div>
    </div>
  );
}

export default MessageContent;