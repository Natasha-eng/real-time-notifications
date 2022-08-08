import React from "react";
import "./navbar.css";
import notification from "../../img/notification.svg";
import message from "../../img/message.svg";
import settings from "../../img/settings.svg";
import { useEffect, useState } from "react";

export default function Navbar({ socket }) {
  const [notifications, setNotifications] = useState([]);
  const [text, setText] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("getText", (data) => {
      setText((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type, i }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }

    return (
      <span key={i} className="notification">
        {" "}
        {`${senderName} ${action} your post`}
      </span>
    );
  };

  const displayText = ({ senderName, text, i }) => {
    return (
      <span key={i} className="notification">
        {" "}
        {`${senderName} ${text}`}
      </span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  const handleReadText = () => {
    setText([]);
    setOpenMessage(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Notification App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={notification} alt="icon" className="iconImg" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon" onClick={() => setOpenMessage(!openMessage)}>
          <img src={message} alt="icon" className="iconImg" />
          {text.length > 0 && <div className="counter">{text.length}</div>}
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={settings} alt="icon" className="iconImg" />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n, i) => displayNotification(n, i))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}

      {openMessage && (
        <div className="notifications">
          {text.map((t, i) => displayText(t, i))}
          <button className="nButton" onClick={handleReadText}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
}
