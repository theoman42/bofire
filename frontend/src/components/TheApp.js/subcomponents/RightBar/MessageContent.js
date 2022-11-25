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

  const getTime = (msgTime) => {
    const today = new Date();
    const messageTime = new Date(msgTime);
    let t = {};
    let difference = today.getTime() - messageTime.getTime();
    let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    if (daysDifference) return `${daysDifference}d`;
    difference -= daysDifference * 1000 * 60 * 60 * 24;
    let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    if (hoursDifference) return `${hoursDifference}h`;
    difference -= hoursDifference * 1000 * 60 * 60;
    let minutesDifference = Math.floor(difference / 1000 / 60);
    if (minutesDifference) return `${minutesDifference}m`;
    difference -= minutesDifference * 1000 * 60;
    let secondsDifference = Math.floor(difference / 1000);
    if (secondsDifference) return `${secondsDifference}s`;

    return "just now";
  };

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
                <span className="message-text">{message.messageBody}</span>
                <div>{getTime(message.createdAt)}</div>
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
